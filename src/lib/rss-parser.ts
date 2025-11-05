import type { Item, Output } from 'rss-parser'
import Parser from 'rss-parser'
import { addAndUpdateFeed, addArticles } from '../db/query'

export type OutputItem = Item & {
  'content:encoded': string
}
export type OutputFeed = Output<OutputItem> & {
  lastBuildDate: string
}
const parser = new Parser<OutputFeed>({
  customFields: {
    item: ['content:encoded'],
  },
})

export async function parseRSSFeed(url: string) {
  const parsedFeed = await parser.parseURL(url)

  try {
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
  catch (error) {
    console.error('Error parsing RSS feed:', error)
    throw error
  }
}
