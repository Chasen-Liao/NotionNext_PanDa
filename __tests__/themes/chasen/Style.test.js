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
})
