import type {
  Article,
  ArticleSelect,
  Feed,
  FeedSelect,
  FeedWithArticles,
  User,
  UserSelect,
} from './schema'
import { and, eq } from 'drizzle-orm'
import { use } from 'react'
import { db } from './db'
import {
  articlesTable,
  feedsTable,
  profileInfosTable,
  subscriptions,
  usersTable,
} from './schema'

// ========= Users functions ==========

// 新增用户
export async function addUser(user: User): Promise<UserSelect[]> {
  // 添加用户的时候，也要添加用户的 profileInfo
  const result = await db.insert(usersTable).values(user).onConflictDoNothing({
    target: usersTable.email,
  }).onConflictDoNothing({
    target: usersTable.email,
  }).returning()

  const userId = result[0]?.id
  if (userId) {
    await db.insert(profileInfosTable).values({
      userId,
      feedId: 0,
      articleId: 0,
      sidebar: 'moreSettings',
    })
  }

  return result
}

// 获取所有用户
export async function getAllUsers(): Promise<any[]> {
  return await db.query.usersTable.findMany({
    with: {
      profileInfo: true,
    },
  })
  // try {
  //   const userSubscriptions = await db
  //     .select()
  //     .from(usersTable)
  //     .fullJoin(subscriptions, eq(usersTable.id, subscriptions.userId))

  //   return userSubscriptions
  // }
  // catch (error) {
  //   console.error('Error fetching users:', error)
  //   return []
  // }
}

// 根据ID获取用户
export async function getUserById(id: number): Promise<any> {
  const users = await db.select().from(usersTable).where(eq(usersTable.id, id))
  return users[0] || null
}

export async function updateUser(id: number, user: Partial<User>): Promise<void> {
  await db.update(usersTable).set(user).where(eq(usersTable.id, id))
}

// addTestUser()
// 添加测试用户，如果已存在则忽略
export async function addTestUser(): Promise<void> {
  // 查询数据库有无用户数据，没有则新增一条用户信息
  const existingUsers = await db.select().from(usersTable)
  if (existingUsers.length > 0) {
    return
  }

  await addUser({
    email: '18267094443@163.com',
  })

  // await db.insert(usersTable).values({
  //   email: 'test@example.com',
  // }).onConflictDoNothing({
  //   target: usersTable.email,
  // })

  // db.insert(subscriptions).values({
  //   userId: 1,
  //   feedId: 2,
  // }).catch(() => {

  //   db.select().from(subscriptions).then((result) => {
  //   })
  // })

  // await db.insert(subscriptions).values({
  //   userId: 1,
  //   feedId: 4,
  // })

  // await db.insert(profileInfosTable).values({
  //   bio: 'This is a test user.',
  //   avatarUrl: 'https://example.com/avatar.png',
  //   feedIds: '3,4,6',
  // })
}

addTestUser()

// ========= Feeds functions ==========
export async function getAllFeeds(): Promise<FeedSelect[]> {
  return await db.select().from(feedsTable)
}

// 获取所有订阅源及其对应的文章
export async function getAllFeedsWithArticles(): Promise<FeedWithArticles[]> {
  const feeds = await db.query.feedsTable.findMany({
    with: {
      articles: true,
    },
  })

  return feeds
}

export async function getFeedById(id: number): Promise<FeedSelect | null> {
  const feeds = await db.select().from(feedsTable).where(eq(feedsTable.id, id))
  return feeds[0] || null
}

export async function getFeedByUrl(url: string): Promise<FeedSelect | null> {
  const feeds = await db.select().from(feedsTable).where(eq(feedsTable.url, url))
  return feeds[0] || null
}

export async function addAndUpdateFeed(feed: Feed): Promise<FeedSelect[]> {
  return await db.insert(feedsTable).values(feed).onConflictDoUpdate({
    target: feedsTable.url,
    set: {
      lastBuildDate: feed.lastBuildDate,
    },
  }).returning()
}

export async function updateFeed(id: number, feed: Partial<Feed>): Promise<void> {
  await db.update(feedsTable).set(feed).where(eq(feedsTable.id, id))
}

// ========== Articles functions ==========

export async function getAllArticles(): Promise<ArticleSelect[]> {
  return await db.select().from(articlesTable)
}

export async function getArticlesByFeedId(feedId: number): Promise<ArticleSelect[]> {
  return await db.select().from(articlesTable).where(eq(articlesTable.feedId, feedId))
}

export async function getArticlesByPublishedAt(params: { publishedAt: string }): Promise<ArticleSelect[]> {
  return await db.select().from(articlesTable).where(eq(articlesTable.publishedAt, params.publishedAt))
}

export async function addArticle(article: Article): Promise<void> {
  await db.insert(articlesTable).values(article)
}

export async function addArticles(articles: Article[]): Promise<void> {
  await db.insert(articlesTable).values(articles).onConflictDoNothing({
    target: articlesTable.url,
  }).returning()
}

// ========== Profile Info functions ==========

// export async function getProfileInfoByUserId(userId: number): Promise<any> {
//   const profileInfos = await db.select().from(profileInfosTable).where(eq(profileInfosTable.userId, userId))
//   return profileInfos[0] || null
// }

// export async function updateProfileInfo(userId: number, profileInfo: Partial<any>): Promise<void> {
//   await db.update(profileInfosTable).set(profileInfo).where(eq(profileInfosTable.userId, userId))
// }

// 获取当前用户的订阅列表
export async function getSubscriptionsByUserId(userId: number): Promise<FeedSelect[]> {
  const userSubscriptions = await db
    .select({
      id: feedsTable.id,
      url: feedsTable.url,
      title: feedsTable.title,
      subscribedAt: subscriptions.subscribedAt,
      lastBuildDate: feedsTable.lastBuildDate,
    })
    .from(subscriptions)
    .innerJoin(feedsTable, eq(subscriptions.feedId, feedsTable.id))
    .where(eq(subscriptions.userId, userId))

  return userSubscriptions
}

// 添加订阅
export async function addSubscription(userId: number, feedId: number): Promise<void> {
  await db.insert(subscriptions).values({
    userId,
    feedId,
  }).onConflictDoNothing({
    target: [subscriptions.userId, subscriptions.feedId],
  })
}
// 取消订阅
export async function removeSubscription(userId: number, feedId: number): Promise<void> {
  await db.delete(subscriptions).where(
    and(
      eq(subscriptions.userId, userId),
      eq(subscriptions.feedId, feedId),
    ),
  )
}
