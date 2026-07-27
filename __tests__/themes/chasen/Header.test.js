import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from '@/themes/chasen/components/Header'
import { MenuList } from '@/themes/chasen/components/MenuList'
import { useGlobal } from '@/lib/global'
import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'

jest.mock('@/lib/global', () => ({
  useGlobal: jest.fn()
}))

jest.mock('@/lib/config', () => ({
  siteConfig: jest.fn()
}))

jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ href, children, ...props }) => (
    <a href={typeof href === 'string' ? href : href?.pathname} {...props}>
      {children}
    </a>
  )
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

const locale = {
  NAV: {
    SEARCH: 'Search',
    ARCHIVE: 'Archive'
  },
  COMMON: {
    CATEGORY: 'Category',
    TAGS: 'Tags'
  }
}

const setup = ({ asPath = '/', pathname = asPath } = {}) => {
  useGlobal.mockReturnValue({
    locale,
    isDarkMode: false,
    toggleDarkMode: jest.fn()
  })
  useRouter.mockReturnValue({ asPath, pathname })
  siteConfig.mockImplementation((key, defaultValue) => {
    if (key === 'CUSTOM_MENU') return false
    if (key.startsWith('THOUGHTLITE_MENU_')) return true
    if (key === 'TITLE') return 'Chasen'
    return defaultValue
  })
}

describe('Chasen navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    setup()
  })

  it('marks the current menu link and gives it a 44px touch target', () => {
    setup({ asPath: '/archive?from=home', pathname: '/archive' })

    render(<MenuList variant='header' />)

    const archiveLink = screen.getByRole('link', { name: 'Archive' })
    expect(archiveLink).toHaveAttribute('aria-current', 'page')
    expect(archiveLink).toHaveClass('min-h-[44px]', 'min-w-[44px]')
  })

  it('exposes a named navigation landmark controlled by the mobile menu button', async () => {
    const user = userEvent.setup()

    render(<Header />)

    const menuButton = screen.getByRole('button', {
      name: 'Open navigation menu'
    })
    const navigation = screen.getByRole('navigation', {
      name: 'Primary navigation'
    })

    expect(navigation).toHaveAttribute('id', 'chasen-main-navigation')
    expect(menuButton).toHaveAttribute(
      'aria-controls',
      'chasen-main-navigation'
    )
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveClass('min-h-[44px]', 'min-w-[44px]')
    expect(navigation).toHaveClass('hidden')

    await user.click(menuButton)

    expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    expect(menuButton).toHaveAccessibleName('Close navigation menu')
    expect(navigation).not.toHaveClass('hidden')
  })

  it('keeps the header as a sticky banner and all visible controls at 44px', () => {
    render(<Header />)

    expect(screen.getByRole('banner')).toHaveClass('sticky')

    for (const button of screen.getAllByRole('button')) {
      expect(button).toHaveClass('min-h-[44px]', 'min-w-[44px]')
    }
  })

  it('uses an accessible vector icon for the theme toggle', () => {
    render(<Header />)

    const themeButton = screen.getByRole('button', { name: 'Dark mode' })
    expect(themeButton.querySelector('svg')).not.toBeNull()
    expect(themeButton).not.toHaveTextContent('☾')
  })
})
