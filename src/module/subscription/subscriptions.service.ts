import type { FeedSelect } from '~/db/schema'
import {
  and,
  eq,
} from 'drizzle-orm'
import { db } from '~/db/db'
import {
  feedsTable,
  subscriptions,
} from '~/db/schema'

// 根据用户 ID 查询订阅列表
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
  await db
    .insert(subscriptions)
    .values({
      userId,
      feedId,
    })
    .onConflictDoNothing({ target: [subscriptions.userId, subscriptions.feedId] })
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
