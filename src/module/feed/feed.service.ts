import type {
  Feed,
  FeedSelect,
  FeedWithArticles,
} from '~/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '~/db/db'
import { feedsTable } from '~/db/schema'
import { parser } from '~/lib/rss-parser'
import { addArticles } from '../article/article.service'

// 查询所有订阅及其文章
export async function getAllFeedsWithArticles(): Promise<FeedWithArticles[]> {
  const feeds = await db
    .query
    .feedsTable
    .findMany({ with: { articles: true } })

  return feeds
}

// 查询所有订阅
export async function getAllFeeds(): Promise<FeedSelect[]> {
  return await db
    .select()
    .from(feedsTable)
}

// 根据 ID 获取订阅
export async function getFeedById(id: number): Promise<FeedSelect | null> {
  const feeds = await db
    .select()
    .from(feedsTable)
    .where(eq(feedsTable.id, id))
  return feeds[0] || null
}

// 根据 URL 获取订阅
export async function getFeedByUrl(url: string): Promise<FeedSelect | null> {
  const feeds = await db
    .select()
    .from(feedsTable)
    .where(eq(feedsTable.url, url))
  return feeds[0] || null
}

// 新增订阅（如果已存在则更新）
export async function addAndUpdateFeed(feed: Feed) {
  return await db
    .insert(feedsTable)
    .values(feed)
    .onConflictDoUpdate({
      target: feedsTable.url,
      set: { lastBuildDate: feed.lastBuildDate },
    })
    .returning()
}

// 新增订阅
export async function addFeed(url: string) {
  const parsedFeed = await parser.parseURL(url)

  const feed = await addAndUpdateFeed({
    title: parsedFeed.title || 'No title',
    url: parsedFeed.feedUrl || url,
    lastBuildDate: parsedFeed.lastBuildDate,
  })

  const feedId = feed[0]?.id
  if (feedId) {
    const articles = parsedFeed.items.map((item) => {
      return {
        feedId,
        title: item.title || 'No title',
        content: item['content:encoded'] || item.content || '',
        summary: item.summary || item.contentSnippet || '',
        url: item.link || '',
        publishedAt: item.pubDate || new Date().toISOString(),
      }
    })
    await addArticles(articles)
  }
}
