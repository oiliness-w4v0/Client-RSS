import { relations } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  nickname: text().notNull().unique(),
  passwordHash: text().notNull(),
  nativeTheme: text().notNull().default('light'),
})

export type User = typeof usersTable.$inferInsert
export type UserSelect = typeof usersTable.$inferSelect

export const feedsTable = sqliteTable('feeds_table', {
  id: int().primaryKey({ autoIncrement: true }),
  url: text().notNull().unique(),
  title: text().notNull().unique(),
  lastBuildDate: text().notNull(),
})

export type Feed = typeof feedsTable.$inferInsert
export type FeedSelect = typeof feedsTable.$inferSelect

export const articlesTable = sqliteTable('articles_table', {
  id: int().primaryKey({ autoIncrement: true }),
  feedId: int().notNull(),
  title: text().notNull(),
  url: text().notNull().unique(),
  content: text().notNull(),
  summary: text().notNull(),
  publishedAt: text().notNull(),
})
export type Article = typeof articlesTable.$inferInsert
export type ArticleSelect = typeof articlesTable.$inferSelect

// ========== Relations ==========

export const userRelations = relations(usersTable, ({ many }) => ({
  feeds: many(feedsTable),
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

export type UserWithFeeds = UserSelect & { feeds: FeedSelect[] }
export type FeedWithArticles = FeedSelect & { articles: ArticleSelect[] }
export type ArticleWithFeed = ArticleSelect & { feed: FeedSelect }
