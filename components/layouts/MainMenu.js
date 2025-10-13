import Link from 'next/link';
import { useEffect, useState } from 'react';
import MenuIcon from '../Icons/MenuIcon';
import dynamic from 'next/dynamic';
const MegaMenu = dynamic(() => import('./MegaMenu'));

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

  return (
    <ul className="mainmenu">
      {menus?.map((menu, menuIndex) => {
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
            {menu?.MenuLink?.url ? (
              <Link href={menu.MenuLink.url} prefetch={false} className="menulink">
                {menu?.MenuLabel}
                {menu?.MegaMenu?.length > 0 && <MenuIcon />}
              </Link>
            ) : (
              <span
                className="menulink nolink"
                style={{ cursor: 'default', textDecoration: 'none' }}
              >
                {menu?.MenuLabel}
                {menu?.MegaMenu?.length > 0 && <MenuIcon />}
              </span>
            )}
            {menu?.MegaMenu?.length > 0 && (
              <MegaMenu menu={menu} activeMenu={selectedIndex} index={menuIndex} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default MainMenu;