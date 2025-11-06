import { relations } from 'drizzle-orm'
import { int, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

// 用户表
export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  nickname: text().notNull().unique(),
  passwordHash: text().notNull(),
  createdAt: int('created_at', { mode: 'timestamp_ms' }).default(new Date()),
})

// RSS 源表
export const feedsTable = sqliteTable('feeds_table', {
  id: int().primaryKey({ autoIncrement: true }),
  url: text().notNull().unique(),
  title: text().notNull().unique(),
  lastBuildDate: text().notNull(),
})

// 订阅关系表（中间表）
export const subscriptions = sqliteTable(
  'subscriptions',
  {
    userId: int('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    feedId: int('feed_id')
      .notNull()
      .references(() => feedsTable.id, { onDelete: 'cascade' }),
    subscribedAt: int('subscribed_at', { mode: 'timestamp_ms' }).default(
      new Date(),
    ),
  },
  table => [
    primaryKey({ columns: [table.userId, table.feedId] }), // 联合主键
  ],
)

export const profileInfosTable = sqliteTable('profile_infos_table', {
  id: int().primaryKey({ autoIncrement: true }),
  bio: text().notNull().default(''),
  avatarUrl: text().notNull().default(''),
  nativeTheme: text().notNull().default('light'),
})

export const articlesTable = sqliteTable('articles_table', {
  id: int().primaryKey({ autoIncrement: true }),
  feedId: int().notNull(),
  title: text().notNull(),
  url: text().notNull().unique(),
  content: text().notNull(),
  summary: text().notNull(),
  publishedAt: text().notNull(),
})

// ========== Relations ==========

export const usersRelations = relations(usersTable, ({ many, one }) => ({
  profileInfo: one(profileInfosTable, {
    fields: [usersTable.id],
    references: [profileInfosTable.id],
  }),
  feeds: many(feedsTable),
}))

export const profileInfoRelations = relations(profileInfosTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [profileInfosTable.id],
    references: [usersTable.id],
  }),
}))

export const feedsRelations = relations(feedsTable, ({ many }) => ({
  articles: many(articlesTable),
}))

export const articlesRelations = relations(articlesTable, ({ one }) => ({
  feed: one(feedsTable, {
    fields: [articlesTable.feedId],
    references: [feedsTable.id],
  }),
}))

export type Article = typeof articlesTable.$inferInsert
export type ArticleSelect = typeof articlesTable.$inferSelect
export type User = typeof usersTable.$inferInsert
export type UserSelect = typeof usersTable.$inferSelect
export type ProfileInfo = typeof profileInfosTable.$inferInsert
export type ProfileInfoSelect = typeof profileInfosTable.$inferSelect
export type Feed = typeof feedsTable.$inferInsert
export type FeedSelect = typeof feedsTable.$inferSelect
export type UserWithFeeds = UserSelect & { feeds: FeedSelect[] }
export type FeedWithArticles = FeedSelect & { articles: ArticleSelect[] }
export type ArticleWithFeed = ArticleSelect & { feed: FeedSelect }
