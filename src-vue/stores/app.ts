import type {
  Article,
  Feed,
  FeedWithArticles,
  ProfileInfo,
} from '../../src/db/schema'
import { defineStore } from 'pinia'

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

  actions: {
    sendEmail(to: string, html: string) {
      return ipcRenderer.invoke('send-mail', to, html)
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
      const result = await ipcRenderer.invoke('get-subscriptions-by-user-id', userId)
      if (result.success) {
        this.subscriptions = (result.data || []).map(feed => feed.id)
      }
    },
    // 添加订阅
    addSubscription(userId: number, feedId: number) {
      return ipcRenderer.invoke('add-subscription', userId, feedId)
    },
    // 移除订阅
    removeSubscription(userId: number, feedId: number) {
      return ipcRenderer.invoke('remove-subscription', userId, feedId)
    },
    // 订阅 RSS 源
    subscribeRSS(url: string) {
      return ipcRenderer.invoke('subscribe-rss', url)
    },
    async getAllFeeds() {
      const result = await ipcRenderer.invoke('get-all-feeds')
      if (result.success) {
        this.feeds = result.data || []
      }
    },
    async getAllArticles() {
      const articles = await ipcRenderer.invoke('get-all-articles')
      if (articles.success) {
        this.articles = articles.data || []
      }
    },
    async getAllFeedsWithArticles() {
      const result = await ipcRenderer.invoke('get-all-feeds-with-articles')
      if (result.success) {
        this.feedsWithArticles = (result.data || []).map(feed => ({
          ...feed,
          show: false,
        }))
      }
    },

    // 获取用户信息
    async getProfileInfoByUserId() {

    },
    listenUpdateCounter() {
      ipcRenderer.on('onUpdateCounter', (_event, value: number) => {
        this.reloadDataVisible = true
        const count = setTimeout(() => {
          this.reloadDataVisible = false
          clearTimeout(count)
        }, 3000)
      })
    },
  },
})
