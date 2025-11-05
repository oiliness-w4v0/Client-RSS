/// <reference types="vite/client" />

import type { Article, Feed, FeedSelect, FeedWithArticles, ProfileInfo } from '../src/db/schema'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import './main.less'

declare global {
  interface Window {
    ipcRenderer: {
      setNativeTheme: (theme: 'dark' | 'light') => Promise<void>
      getNativeTheme: () => Promise<'dark' | 'light'>
      sendMail: (to: string, html: string) => Promise<{ success: boolean, error?: string }>
      subscribeRSS: (url: string) => Promise<{ success: boolean, error?: string }>
      getAllFeeds: () => Promise<{ success: boolean, data?: Feed[], error?: string }>
      getAllArticles: () => Promise<{ success: boolean, data?: Article[], error?: string }>
      getAllFeedsWithArticles: () => Promise<{ success: boolean, data?: FeedWithArticles[], error?: string }>
      getSubscriptionsByUserId: (userId: number) => Promise<{ success: boolean, data?: FeedSelect[], error?: string }>
      addSubscription: (userId: number, feedId: number) => Promise<{ success: boolean, error?: string }>
      removeSubscription: (userId: number, feedId: number) => Promise<{ success: boolean, error?: string }>

      // 主进程发送过来的更新计数器消息
      onUpdateCounter: (callback: (value: number) => void) => void
      // getProfileInfoByUserId: (userId: number) => Promise<{ success: boolean, data?: ProfileInfo, error?: string }>
    }
  }
}

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
