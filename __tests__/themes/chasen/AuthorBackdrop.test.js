import {
  default as AuthorBackdrop,
  AuthorIntro,
  buildAuthorBackdropMeta,
  formatAuthorBackdropDate,
  isShortAuthorBackdropPage,
  isAuthorBackdropRoute
} from '@/themes/chasen/components/AuthorBackdrop'
import { act, render } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server.node'

describe('Chasen author backdrop', () => {
  it('renders the homepage author line with the agreed hierarchy', () => {
    const markup = renderToStaticMarkup(<AuthorIntro />)

    expect(markup).toContain('Chasen')
    expect(markup).toContain('AI原住民')
    expect(markup).toContain('在这里写下关于AI的思考')
    expect(markup).toContain('tl-author-intro__role')
  })

  it('is enabled only on content-list routes', () => {
    expect(isAuthorBackdropRoute('/')).toBe(true)
    expect(isAuthorBackdropRoute('/category/[category]')).toBe(true)
    expect(isAuthorBackdropRoute('/search/[keyword]')).toBe(true)
    expect(isAuthorBackdropRoute('/archive')).toBe(true)
    expect(isAuthorBackdropRoute('/tag/[tag]')).toBe(true)
    expect(isAuthorBackdropRoute('/article/[slug]')).toBe(false)
    expect(isAuthorBackdropRoute('/404')).toBe(false)
  })

  it('formats the latest published date for the blueprint label', () => {
    expect(formatAuthorBackdropDate('2026-07-27')).toBe('2026.07.27')
    expect(formatAuthorBackdropDate('not-a-date')).toBe('')
  })

  it('builds dynamic labels from all published post metadata', () => {
    expect(
      buildAuthorBackdropMeta({
        postCount: 6,
        latestPosts: [{ publishDate: '2026-07-27' }]
      })
    ).toEqual({
      notes: 'NOTES · 06',
      updated: 'UPDATED · 2026.07.27'
    })
  })

  it('hides labels when their source data is unavailable', () => {
    expect(buildAuthorBackdropMeta({})).toEqual({
      notes: '',
      updated: ''
    })
  })

  it('hides the decorative layer on pages with no scrollable content', () => {
    expect(
      isShortAuthorBackdropPage({ documentHeight: 1243, viewportHeight: 1243 })
    ).toBe(true)
    expect(
      isShortAuthorBackdropPage({ documentHeight: 1900, viewportHeight: 1243 })
    ).toBe(false)
  })

  it('restores the visible backdrop after returning from an article', () => {
    jest.useFakeTimers()
    const { container, rerender } = render(<AuthorBackdrop pathname='/' />)

    act(() => {
      jest.runOnlyPendingTimers()
    })
    expect(container.querySelector('.tl-author-backdrop')).toHaveClass('is-ready')

    rerender(<AuthorBackdrop pathname='/article/[slug]' />)
    expect(container.querySelector('.tl-author-backdrop')).not.toBeInTheDocument()

    rerender(<AuthorBackdrop pathname='/' />)
    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(container.querySelector('.tl-author-backdrop')).toHaveClass('is-ready')
    jest.useRealTimers()
  })
})
