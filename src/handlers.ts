import { ipcMain, nativeTheme, Notification } from 'electron'
import { addSubscription, getAllArticles, getAllFeeds, getAllFeedsWithArticles, getSubscriptionsByUserId, removeSubscription } from './db/query'
import { parseRSSFeed } from './lib/rss-parser'

import { sendMail } from './mail'

// IPC Handlers
ipcMain.handle('ping', async () => 'pong')

// native theme change handler
ipcMain.handle('set-native-theme', async (event, theme: 'dark' | 'light') => {
  nativeTheme.themeSource = theme
})

// get native theme
ipcMain.handle('get-native-theme', async () => {
  return nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
})

const NOTIFICATION_TITLE = '@油腻_w4v0 ~'
const NOTIFICATION_BODY
  = '发送给 18267094443@163.com 的邮件发送失败！请检查网络或邮箱地址是否正确。'

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

// 发送邮件
ipcMain.handle('send-mail', async (event, to: string, html: string) => {
  try {
    await sendMail(to, html)
    return { success: true }
  }
  catch (error) {
    showNotification()
    return { success: false, error: (error as Error).message }
  }
})

// 订阅 RSS
ipcMain.handle('subscribe-rss', async (event, url: string) => {
  try {
    await parseRSSFeed(url)
    return { success: true }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

// 查询所有 RSS 订阅
ipcMain.handle('get-all-feeds', async () => {
  try {
    const data = await getAllFeeds()
    return { success: true, data }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

// 查询所有订阅及其文章
ipcMain.handle('get-all-feeds-with-articles', async () => {
  try {
    const data = await getAllFeedsWithArticles()
    return { success: true, data }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

// 查询所有文章
ipcMain.handle('get-all-articles', async () => {
  try {
    const data = await getAllArticles()
    return { success: true, data }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

// 根据用户 ID 查询订阅列表
ipcMain.handle('get-subscriptions-by-user-id', async (event, userId: number) => {
  try {
    const data = await getSubscriptionsByUserId(userId)
    return { success: true, data }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

// 给用户添加订阅
ipcMain.handle('add-subscription', async (event, userId: number, feedId: number) => {
  try {
    await addSubscription(userId, feedId)
    return { success: true }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
})

// 删除用户订阅
ipcMain.handle('remove-subscription', async (event, userId: number, feedId: number) => {
  try {
    await removeSubscription(userId, feedId)
    return { success: true }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
})
