import type { Article } from '~/db/schema'
import { ipcMain } from 'electron'
import { RUN } from '~/lib/constant'
import {
  addArticle,
  addArticles,
  getAllArticles,
  getArticlesByFeedId,
} from './article.service'

/**
 * 获取所有文章
 */
ipcMain.handle(RUN.GET_ALL_ARTICLES, async () => {
  return await getAllArticles()
})

/**
 * 根据订阅 ID 获取文章列表
 */
ipcMain.handle(RUN.GET_ARTICLES_BY_FEED_ID, async (event, feedId: number) => {
  return await getArticlesByFeedId(feedId)
})

/**
 * 新增文章
 */
ipcMain.handle(RUN.ADD_ARTICLE, async (event, article: Article) => {
  return await addArticle(article)
})

/**
 * 批量新增文章
 */
ipcMain.handle(RUN.ADD_ARTICLES, async (event, articles: Article[]) => {
  return await addArticles(articles)
})
