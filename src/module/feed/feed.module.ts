import { ipcMain } from 'electron'
import { RUN } from '~/lib/constant'
import {
  addFeed,
  getAllFeeds,
  getAllFeedsWithArticles,
  getFeedById,
  getFeedByUrl,
} from './feed.service'

// 查询所有订阅及其文章
ipcMain.handle(RUN.GET_ALL_FEEDS_WITH_ARTICLES, async () => {
  return await getAllFeedsWithArticles()
})

// 查询所有订阅
ipcMain.handle(RUN.GET_ALL_FEEDS, async () => {
  return await getAllFeeds()
})

// 根据 ID 查询订阅
ipcMain.handle(RUN.GET_FEED_BY_ID, async (event, id: number) => {
  return await getFeedById(id)
})

// 根据 URL 查询订阅
ipcMain.handle(RUN.GET_FEED_BY_URL, async (event, url: string) => {
  return await getFeedByUrl(url)
})

// 新增订阅
ipcMain.handle(RUN.ADD_FEED, async (event, url: string) => {
  await addFeed(url)
})
