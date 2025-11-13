import type {
  Article,
  ArticleSelect,
} from '~/db/schema'
import { eq } from 'drizzle-orm'
import { db } from '~/db/db'
import { articlesTable } from '~/db/schema'

// 获取所有文章
export async function getAllArticles(): Promise<ArticleSelect[]> {
  return await db
    .select()
    .from(articlesTable)
}

// 根据 ID 获取文章
export async function getArticleById(id: number): Promise<ArticleSelect | null> {
  const article = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.id, id))
    .limit(1)
  console.log('查询文章', id, article)
  return article.length > 0 ? article[0] : null
}

// 根据订阅 ID 获取文章列表
export async function getArticlesByFeedId(feedId: number): Promise<ArticleSelect[]> {
  return await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.feedId, feedId))
}

// 新增文章
export async function addArticle(article: Article): Promise<void> {
  await db
    .insert(articlesTable)
    .values(article)
}

// 批量新增文章
export async function addArticles(articles: Article[]): Promise<void> {
  await db
    .insert(articlesTable)
    .values(articles)
    .onConflictDoNothing({ target: articlesTable.url })
    .returning()
}
