import SmartLink from '@/components/SmartLink'
import { Moon, Sun } from '@/components/HeroIcons'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { MenuList } from './MenuList'
import { useState } from 'react'

/**
 * ThoughtLite 风格顶栏：站点名 + 横向菜单 + 搜索 / 深浅色
 */
export const Header = props => {
  const { isDarkMode, toggleDarkMode } = useGlobal()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openSearch = () => {
    window.location.href = '/search'
  }

  return (
    <header className='tl-header sticky top-0 z-40 w-full'>
      <div className='relative mx-auto flex max-w-3xl items-center gap-2 px-4 py-3 md:gap-4 overflow-visible'>
        <SmartLink
          href='/'
          className='tl-brand flex-shrink-0 text-lg font-semibold text-[var(--tl-text)] no-underline hover:opacity-80'
        >
          {siteConfig('TITLE')}
        </SmartLink>

        <MenuList
          {...props}
          variant='header'
          mobileOpen={isMenuOpen}
          id='chasen-main-navigation'
        />

        <div className='flex flex-shrink-0 items-center gap-1'>
          <button
            type='button'
            className='tl-icon-btn min-h-[44px] min-w-[44px] md:hidden'
            onClick={() => setIsMenuOpen(open => !open)}
            aria-expanded={isMenuOpen}
            aria-controls='chasen-main-navigation'
            aria-label={
              isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
          >
            <i
              className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'}
              aria-hidden='true'
            />
          </button>
          {siteConfig('THOUGHTLITE_MENU_SEARCH', null, CONFIG) && (
            <button
              type='button'
              className='tl-icon-btn min-h-[44px] min-w-[44px]'
              onClick={openSearch}
              aria-label='Search'
            >
              <i className='fas fa-search text-sm' aria-hidden='true' />
            </button>
          )}
          <button
            type='button'
            className='tl-icon-btn min-h-[44px] min-w-[44px]'
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}
          >
            <span className='h-5 w-5' aria-hidden='true'>
              {isDarkMode ? <Sun /> : <Moon />}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
