import { renderToStaticMarkup } from 'react-dom/server.node'
import {
  CHASEN_DARK_STYLE_TOKENS,
  CHASEN_STYLE_TOKENS,
  Style
} from '@/themes/chasen/style'

describe('chasen visual system', () => {
  it('renders warm paper tokens and accessible motion fallbacks', () => {
    renderToStaticMarkup(<Style />)

    expect(CHASEN_STYLE_TOKENS).toEqual({
      bg: '#f3f0e9',
      surface: '#fffdf8',
      border: '#ded8cd',
      warmAccent: '#b46942',
      shadowFloat: '0 8px 24px rgba(38, 35, 30, 0.08)'
    })

    expect(CHASEN_DARK_STYLE_TOKENS).toEqual({
      bg: '#0c0c0d',
      surface: '#141416',
      text: '#ececec',
      muted: '#9ca3af',
      faint: '#6b7280',
      border: '#27272a',
      accent: '#60a5fa'
    })
  })

  it('centers each timeline marker on its vertical rail', () => {
    const css = Style().props.children
    const rail = css.match(/\.tl-timeline-rail::before\s*\{([^}]+)\}/)?.[1]
    const marker = css.match(/\.tl-timeline-item::before\s*\{([^}]+)\}/)?.[1]
    const readRem = (css, property) =>
      Number(css.match(new RegExp(`${property}:\\s*(-?[\\d.]+)rem`))?.[1])
    const readPx = (css, property) =>
      Number(css.match(new RegExp(`${property}:\\s*([\\d.]+)px`))?.[1])

    const railCenter = readRem(rail, 'left') * 16 + readPx(rail, 'width') / 2
    const markerCenter =
      readRem(marker, 'left') * 16 + 1.25 * 16 + readPx(marker, 'width') / 2

    expect(markerCenter).toBeCloseTo(railCenter, 6)
  })
})
