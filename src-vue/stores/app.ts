import type { Article, Feed, FeedWithArticles, ProfileInfo } from '../../src/db/schema'
import { defineStore } from 'pinia'
import { useCacheStore } from './cache'

interface AppState {
  feeds: Feed[]
  subscriptions: number[]
  feedsWithArticles: (FeedWithArticles & { show: false })[]
  articles: Article[]
  // ProfileInfo
  profileInfo: ProfileInfo | null

  // dialog
  feedDialogVisible: boolean
  reloadDataVisible: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    feeds: [],
    subscriptions: [],
    feedsWithArticles: [],
    articles: [],

    // profileInfo
    profileInfo: null,

    // dialog
    feedDialogVisible: false,
    reloadDataVisible: false,
  }),
  // getters: {
  //   currentArticle: (state) => {
  //     console.log('Getting current article from cache store', state)
  //     const cacheStore = useCacheStore()
  //     console.log('Getting current article from cache store', cacheStore.cache.articleId)
  //     return state.articles.find(article => article.id === cacheStore.cache.articleId) || null
  //   },
  // },
  actions: {
    sendEmail(to: string, html: string) {
      return window.ipcRenderer.sendMail(to, html)
    },
    // 初始化
    init() {
      // this.getAllFeeds()
      this.getAllFeedsWithArticles()
      // this.getProfileInfoByUserId(1)
      this.getSubscriptionsByUserId(1)
      this.listenUpdateCounter()
      // this.getAllArticles()
    },
    // 获取当前用户的订阅列表
    async getSubscriptionsByUserId(userId: number) {
      const result = await window.ipcRenderer.getSubscriptionsByUserId(userId)
      if (result.success) {
        this.subscriptions = (result.data || []).map(feed => feed.id)
      }
    },
    // 添加订阅
    addSubscription(userId: number, feedId: number) {
      return window.ipcRenderer.addSubscription(userId, feedId)
    },
    // 移除订阅
    removeSubscription(userId: number, feedId: number) {
      return window.ipcRenderer.removeSubscription(userId, feedId)
    },
    // 订阅 RSS 源
    subscribeRSS(url: string) {
      return window.ipcRenderer.subscribeRSS(url)
    },
    async getAllFeeds() {
      const result = await window.ipcRenderer.getAllFeeds()
      if (result.success) {
        this.feeds = result.data || []
      }
    },
    async getAllArticles() {
      const articles = await window.ipcRenderer.getAllArticles()
      if (articles.success) {
        this.articles = articles.data || []
      }
    },
    async getAllFeedsWithArticles() {
      const result = await window.ipcRenderer.getAllFeedsWithArticles()
      if (result.success) {
        this.feedsWithArticles = (result.data || []).map(feed => ({ ...feed, show: false }))
      }
    },
    // setCurrentArticle(article: Article) {
    // this.currentArticle = article
    // },

    // 获取用户信息
    async getProfileInfoByUserId() {
      // const result = await window.ipcRenderer.getProfileInfoByUserId(userId)
      // if (result.success) {
      //   this.profileInfo = result.data || null
      // }
    },
    listenUpdateCounter() {
      window.ipcRenderer.onUpdateCounter((value: number) => {
        this.reloadDataVisible = true
        const count = setTimeout(() => {
          this.reloadDataVisible = false
          clearTimeout(count)
        }, 3000)
      })
    },
  },
})
