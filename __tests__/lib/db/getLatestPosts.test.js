jest.mock('notion-utils', () => ({}))
jest.mock('notion-client', () => ({}))
jest.mock('p-limit', () => () => task => task())
jest.mock('@/lib/db/notion/getAllPageIds', () => ({}))
jest.mock('@/lib/db/notion/getNotionConfig', () => ({}))
jest.mock('@/lib/db/notion/getPostBlocks', () => ({}))
jest.mock('@/lib/db/notion/getNotionPost', () => ({}))

import { getLatestPosts } from '@/lib/db/SiteDataApi'

describe('getLatestPosts', () => {
  it('orders published posts by their publish date instead of their last edit time', () => {
    const posts = [
      {
        id: 'older-but-edited',
        type: 'Post',
        status: 'Published',
        publishDate: '2026-04-06',
        lastEditedDate: '2026-07-28'
      },
      {
        id: 'newest',
        type: 'Post',
        status: 'Published',
        publishDate: '2026-07-28',
        lastEditedDate: '2026-07-28'
      },
      {
        id: 'draft',
        type: 'Post',
        status: 'Draft',
        publishDate: '2026-07-29'
      }
    ]

    expect(getLatestPosts({ allPages: posts, latestPostCount: 2 }).map(post => post.id)).toEqual([
      'newest',
      'older-but-edited'
    ])
  })
})
