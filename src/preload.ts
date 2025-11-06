import type { User } from './db/schema'
import { contextBridge, ipcRenderer } from 'electron'

export type IpcRendererAPI = typeof api

const api = {
  setNativeTheme: (theme: 'dark' | 'light') => ipcRenderer.invoke('set-native-theme', theme),
  getNativeTheme: () => ipcRenderer.invoke('get-native-theme'),
  sendMail: (to: string, html: string) => ipcRenderer.invoke('send-mail', to, html),
  subscribeRSS: (url: string) => ipcRenderer.invoke('subscribe-rss', url),
  getAllFeeds: () => ipcRenderer.invoke('get-all-feeds'),
  getAllArticles: () => ipcRenderer.invoke('get-all-articles'),
  getAllFeedsWithArticles: () => ipcRenderer.invoke('get-all-feeds-with-articles'),
  // getProfileInfoByUserId: (userId: number) => ipcRenderer.invoke('get-profile-info-by-user-id', userId),
  getSubscriptionsByUserId: (userId: number) => ipcRenderer.invoke('get-subscriptions-by-user-id', userId),
  addSubscription: (userId: number, feedId: number) => ipcRenderer.invoke('add-subscription', userId, feedId),
  removeSubscription: (userId: number, feedId: number) => ipcRenderer.invoke('remove-subscription', userId, feedId),
  getAllUsers: () => ipcRenderer.invoke('get-all-users'),
  addUser: (user: User) => ipcRenderer.invoke('add-user', user),
  onUpdateCounter: (callback: (value: number) => void) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
}

contextBridge.exposeInMainWorld('ipcRenderer', api)
