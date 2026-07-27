import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 导航菜单列表
 * @param {*} props
 * @param {'stack'|'header'} [props.variant] stack：旧版通栏导航；header：顶栏内横向滚动
 * @returns
 */
export const MenuList = props => {
  const {
    customNav,
    customMenu,
    variant = 'stack',
    mobileOpen = true,
    id = 'chasen-main-navigation'
  } = props
  const { locale } = useGlobal()

  let links = [
    {
      id: 1,
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('THOUGHTLITE_MENU_SEARCH', null, CONFIG)
    },
    {
      id: 2,
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('THOUGHTLITE_MENU_ARCHIVE', null, CONFIG)
    },
    {
      id: 3,
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('THOUGHTLITE_MENU_CATEGORY', null, CONFIG)
    },
    {
      id: 4,
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('THOUGHTLITE_MENU_TAG', null, CONFIG)
    }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  // 如果 开启自定义菜单，则不再使用 Page生成菜单。
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  if (variant === 'header') {
    return (
      <nav
        id={id}
        aria-label='Primary navigation'
        className={`${
          mobileOpen ? 'flex' : 'hidden'
        } absolute left-0 right-0 top-full z-20 w-full border-b border-[var(--tl-border)] bg-[var(--tl-surface)] px-4 py-2 shadow-sm md:static md:flex md:flex-1 md:w-auto md:border-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none md:justify-center overflow-visible`}
      >
        <ul className='flex max-h-[calc(100vh-5rem)] w-full flex-col items-stretch gap-0.5 overflow-y-auto py-1 no-scrollbar md:max-h-none md:w-auto md:flex-row md:items-center md:gap-0.5 md:overflow-x-auto md:overflow-y-visible sm:gap-1'>
          {links
            .filter(link => link?.show !== false)
            .map((link, index) => (
              <MenuItemDrop
                key={link.id ?? index}
                link={link}
                variant='inline'
                submenuId={`${id}-submenu-${link.id ?? index}`}
              />
            ))}
        </ul>
      </nav>
    )
  }

  return (
    <nav className='w-full bg-white md:pt-0 px-6 relative z-20 border-t border-b border-gray-light dark:border-hexo-black-gray dark:bg-black'>
      <div className='mx-auto max-w-4xl md:flex justify-between items-center text-sm md:text-md md:justify-start'>
        <ul className='w-full text-center md:text-left flex flex-wrap justify-center items-stretch md:justify-start md:items-start'>
          {links.map((link, index) => (
            <MenuItemDrop key={index} link={link} />
          ))}
        </ul>
        {/* <div className="w-full md:w-1/3 text-center md:text-right"> */}
        {/* <!-- extra links --> */}
        {/* </div> */}
      </div>
    </nav>
  )
}
