import Parser from 'rss-parser'

export async function test() {
  const parser = new Parser()
  const feed = await parser.parseURL('https://oldj.net/feed')

  console.log(feed.title)
  feed.items.forEach((item) => {
    console.log(JSON.stringify(item, null, 2))
  },
  )
}

test()
