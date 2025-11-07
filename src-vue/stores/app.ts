import type {
  Article,
  ArticleSelect,
  Feed,
  FeedSelect,
  FeedWithArticles,
} from '../../src/db/schema'
import { defineStore } from 'pinia'
import { RUN } from '~/lib/constant'

interface AppState {
  feeds: Feed[]
  subscriptions: number[]
  feedsWithArticles: (FeedWithArticles & { show: false })[]
  articles: Article[]

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
      this.getAllFeedsWithArticles()
      this.getSubscriptionsByUserId(1)
      this.listenUpdateCounter()
    },
    // 获取当前用户的订阅列表
    async getSubscriptionsByUserId(userId: number) {
      const result = await ipcRenderer.invoke(RUN.GET_SUBSCRIPTIONS_BY_USER_ID, userId) as FeedSelect[]
      this.subscriptions = (result || []).map(feed => feed.id)
    },
    // 添加订阅
    addSubscription(userId: number, feedId: number) {
      return ipcRenderer.invoke(RUN.ADD_SUBSCRIPTION, userId, feedId)
    },
    // 移除订阅
    removeSubscription(userId: number, feedId: number) {
      return ipcRenderer.invoke(RUN.REMOVE_SUBSCRIPTION, userId, feedId)
    },
    // 订阅 RSS 源
    subscribeRSS(url: string) {
      return ipcRenderer.invoke(RUN.ADD_FEED, url)
    },
    async getAllFeeds() {
      const data = await ipcRenderer.invoke(RUN.GET_ALL_FEEDS) as Feed[]
      this.feeds = data || []
    },
    async getAllArticles() {
      const articles = await ipcRenderer.invoke(RUN.GET_ALL_ARTICLES) as ArticleSelect[]
      this.articles = articles || []
    },
    async getAllFeedsWithArticles() {
      const result = await ipcRenderer.invoke(RUN.GET_ALL_FEEDS_WITH_ARTICLES) as FeedWithArticles[]
      this.feedsWithArticles = (result || []).map(feed => ({
        ...feed,
        show: false,
      }))
    },

    // 获取用户信息
    async getProfileInfoByUserId() {

    },
    listenUpdateCounter() {
      // ipcRenderer.on('onUpdateCounter', (_event, value: number) => {
      //   this.reloadDataVisible = true
      //   const count = setTimeout(() => {
      //     this.reloadDataVisible = false
      //     clearTimeout(count)
      //   }, 3000)
      // })
    },
  },
})
