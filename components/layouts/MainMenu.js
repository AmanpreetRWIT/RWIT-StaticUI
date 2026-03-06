import Link from 'next/link';
import { useEffect, useState } from 'react';
import MenuIcon from '../Icons/MenuIcon';
import dynamic from 'next/dynamic';
const MegaMenu = dynamic(() => import('./MegaMenu'));
const DesktopMegaMenu = dynamic(() => import('./DesktopMegaMenu'));

const MainMenu = ({ menus }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleDropdownToggle = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };
  useEffect(() => {
    const links = document.querySelectorAll('.has-dropdown');
    links?.forEach((link) => {
      const submenu = link?.lastElementChild;
      if (submenu) {
        const classLists = link?.classList;
        if (!classLists?.contains('active-menu') && classLists?.contains('show')) {
          submenu?.classList?.remove('show');
        }
      }
    });
  }, [selectedIndex]);
  const [isDesktop, setIsDesktop] = useState(undefined);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ul className='mainmenu'>
      {menus?.map((menu, menuIndex) => {
        const menuHref =
          menu?.MenuLink?.story?.url !== undefined
            ? '/' + menu?.MenuLink?.story?.url
            : menu?.MenuLink?.url;
        const isInternalLink = typeof menuHref === 'string' && menuHref.startsWith('/');
        const isForcedNoLocale =
          isInternalLink && /\/(blog|category|case-study|casestudies)(\/|$)/.test(menuHref);
        return (
          <li
            className={
              menu?.MegaMenu?.length > 0
                ? `has-dropdown ${menuIndex === selectedIndex ? 'active-menu' : ''}`
                : ''
            }
            key={`menu-item-${menuIndex}`}
            onClick={() => handleDropdownToggle(menuIndex)}
          >
            {menu?.MenuLink?.story?.url || menu?.MenuLink?.url ? (
              <Link
                href={menuHref}
                prefetch={false}
                locale={isForcedNoLocale ? false : undefined}
                className='menulink'
              >
                {menu?.MenuLabel}
                {menu?.MegaMenu?.length > 0 && (
                  <>
                    <MenuIcon />
                  </>
                )}
              </Link>
            ) : (
              <span
                className='menulink nolink'
                style={{ cursor: 'default', textDecoration: 'none' }}
              >
                {menu?.MenuLabel}
                {menu?.MegaMenu?.length > 0 && <MenuIcon />}
              </span>
            )}
            {menu?.MegaMenu?.length > 0 && isDesktop !== undefined && (
              <>
                {isDesktop ? (
                  <DesktopMegaMenu menu={menu} activeMenu={selectedIndex} index={menuIndex} />
                ) : (
                  <MegaMenu menu={menu} activeMenu={selectedIndex} index={menuIndex} />
                )}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MainMenu;
