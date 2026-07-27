import { useEffect, useRef } from 'react'

const AUTHOR_BACKDROP_ROUTES = new Set([
  '/',
  '/page/[page]',
  '/archive',
  '/category',
  '/category/[category]',
  '/category/[category]/page/[page]',
  '/tag',
  '/tag/[tag]',
  '/tag/[tag]/page/[page]',
  '/search',
  '/search/[keyword]',
  '/search/[keyword]/page/[page]'
])

const SHORT_PAGE_BUFFER = 160

export const isAuthorBackdropRoute = pathname =>
  AUTHOR_BACKDROP_ROUTES.has(pathname)

export const isShortAuthorBackdropPage = ({
  documentHeight,
  viewportHeight,
  buffer = SHORT_PAGE_BUFFER
} = {}) => {
  const pageHeight = Number(documentHeight)
  const windowHeight = Number(viewportHeight)
  const breathingRoom = Number(buffer)

  if (![pageHeight, windowHeight, breathingRoom].every(Number.isFinite)) {
    return false
  }

  return pageHeight <= windowHeight + breathingRoom
}

const getDateValue = value => {
  if (value instanceof Date) {
    return value
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    const timestamp = value < 1e12 ? value * 1000 : value
    return new Date(timestamp)
  }

  if (typeof value === 'string') {
    const dateOnly = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
    if (dateOnly) {
      return new Date(
        Number(dateOnly[1]),
        Number(dateOnly[2]) - 1,
        Number(dateOnly[3])
      )
    }

    return new Date(value)
  }

  return null
}

export const formatAuthorBackdropDate = value => {
  const date = getDateValue(value)
  if (!date || Number.isNaN(date.getTime())) return ''

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}

const getPublishedDate = post =>
  post?.publishDate || post?.date?.start_date || post?.createdTime

export const buildAuthorBackdropMeta = ({
  postCount,
  latestPosts = [],
  posts = []
} = {}) => {
  const count = Number(postCount)
  const notes =
    Number.isFinite(count) && count > 0
      ? `NOTES · ${String(Math.floor(count)).padStart(2, '0')}`
      : ''

  const candidatePosts = [
    ...(Array.isArray(latestPosts) ? latestPosts : []),
    ...(Array.isArray(posts) ? posts : [])
  ]

  const latestTimestamp = candidatePosts
    .map(getPublishedDate)
    .map(getDateValue)
    .filter(date => date && !Number.isNaN(date.getTime()))
    .reduce(
      (latest, date) => Math.max(latest, date.getTime()),
      Number.NEGATIVE_INFINITY
    )

  const updated = Number.isFinite(latestTimestamp)
    ? `UPDATED · ${formatAuthorBackdropDate(new Date(latestTimestamp))}`
    : ''

  return { notes, updated }
}

export const AuthorIntro = () => (
  <header className='tl-author-intro' aria-label='About Chasen'>
    <p className='tl-author-intro__line'>
      <span className='tl-author-intro__name'>Chasen</span>
      <span className='tl-author-intro__separator' aria-hidden='true'>
        |
      </span>
      <span className='tl-author-intro__role'>AI原住民</span>
      <span className='tl-author-intro__separator' aria-hidden='true'>
        |
      </span>
      <span className='tl-author-intro__description'>
        在这里写下关于AI的思考
      </span>
    </p>
  </header>
)

export default function AuthorBackdrop({
  pathname,
  postCount,
  latestPosts,
  posts
}) {
  const backdropRef = useRef(null)
  const meta = buildAuthorBackdropMeta({ postCount, latestPosts, posts })

  useEffect(() => {
    const backdrop = backdropRef.current
    if (!backdrop || typeof window === 'undefined') return undefined

    const updatePageVisibility = () => {
      const isShortPage = isShortAuthorBackdropPage({
        documentHeight: document.documentElement.scrollHeight,
        viewportHeight: window.innerHeight
      })
      backdrop.classList.toggle('is-short-page', isShortPage)
      backdrop.classList.add('is-ready')
    }

    const visibilityTimers = [
      window.setTimeout(updatePageVisibility, 120),
      window.setTimeout(updatePageVisibility, 600)
    ]
    window.addEventListener('resize', updatePageVisibility)

    const observedElement =
      document.querySelector('#container-inner') || document.documentElement
    const resizeObserver = window.ResizeObserver
      ? new window.ResizeObserver(updatePageVisibility)
      : null
    resizeObserver?.observe(observedElement)

    const pointerFine = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!pointerFine.matches || reducedMotion.matches) {
      return () => {
        window.removeEventListener('resize', updatePageVisibility)
        visibilityTimers.forEach(timer => window.clearTimeout(timer))
        resizeObserver?.disconnect()
      }
    }

    let frameId = null

    const resetPosition = () => {
      backdrop.classList.remove('is-pointer-active')
      backdrop.style.setProperty('--tl-avatar-shift-x', '0px')
      backdrop.style.setProperty('--tl-avatar-shift-y', '0px')
      backdrop.style.setProperty('--tl-grain-shift-x', '0px')
      backdrop.style.setProperty('--tl-grain-shift-y', '0px')
    }

    const handlePointerMove = event => {
      if (frameId) return

      frameId = window.requestAnimationFrame(() => {
        frameId = null
        const rect = backdrop.getBoundingClientRect()
        const isInside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom

        if (!isInside) {
          resetPosition()
          return
        }

        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5
        backdrop.classList.add('is-pointer-active')
        backdrop.style.setProperty('--tl-avatar-shift-x', `${x * 3}px`)
        backdrop.style.setProperty('--tl-avatar-shift-y', `${y * 2}px`)
        backdrop.style.setProperty('--tl-grain-shift-x', `${x * 8}px`)
        backdrop.style.setProperty('--tl-grain-shift-y', `${y * 6}px`)
      })
    }

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true
    })
    window.addEventListener('blur', resetPosition)

    return () => {
      window.removeEventListener('resize', updatePageVisibility)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', resetPosition)
      visibilityTimers.forEach(timer => window.clearTimeout(timer))
      resizeObserver?.disconnect()
      if (frameId) window.cancelAnimationFrame(frameId)
    }
  }, [])

  if (!isAuthorBackdropRoute(pathname)) return null

  return (
    <div ref={backdropRef} className='tl-author-backdrop' aria-hidden='true'>
      <div className='tl-author-backdrop__frame'>
        <div className='tl-author-backdrop__grid' />
        <span className='tl-author-backdrop__corner tl-author-backdrop__corner--tl' />
        <span className='tl-author-backdrop__corner tl-author-backdrop__corner--tr' />
        <span className='tl-author-backdrop__corner tl-author-backdrop__corner--bl' />
        <span className='tl-author-backdrop__corner tl-author-backdrop__corner--br' />
        <span className='tl-author-backdrop__marker tl-author-backdrop__marker--top' />
        <span className='tl-author-backdrop__marker tl-author-backdrop__marker--bottom' />

        <span className='tl-author-backdrop__label tl-author-backdrop__label--tl'>
          AI NATIVE
        </span>
        <span className='tl-author-backdrop__label tl-author-backdrop__label--tr'>
          THOUGHTS
        </span>
        {meta.notes ? (
          <span className='tl-author-backdrop__label tl-author-backdrop__label--bl'>
            {meta.notes}
          </span>
        ) : null}
        {meta.updated ? (
          <span className='tl-author-backdrop__label tl-author-backdrop__label--br'>
            {meta.updated}
          </span>
        ) : null}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='tl-author-backdrop__avatar'
          src='/chasen-avatar.png'
          alt=''
        />
        <div className='tl-author-backdrop__grain' />
      </div>
    </div>
  )
}
