import CONFIG from '@/themes/chasen/config'

describe('Chasen theme configuration', () => {
  it('keeps the global Live2D pet hidden for this theme', () => {
    expect(CONFIG.THOUGHTLITE_SHOW_LIVE2D).toBe(false)
  })
})
