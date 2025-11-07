import type {
  Item,
  Output,
} from 'rss-parser'
import Parser from 'rss-parser'

export type OutputItem = Item & {
  'content:encoded': string
}
export type OutputFeed = Output<OutputItem> & {
  lastBuildDate: string
}
export const parser = new Parser<OutputFeed>({ customFields: { item: ['content:encoded'] } })
