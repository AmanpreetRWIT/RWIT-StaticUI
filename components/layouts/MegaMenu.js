import { renderRichText } from '../../helpers/utilities';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const SubMenuList = ({ items, title, listClass }) => {
  if (!items || items.length === 0) return null;

  return (
    <ul className={`${listClass}-container`}>
      {title && (
        <li className='submenu-list-title'>
          <span className={`submenu-list-title-span-${listClass}`}>{title}</span>
        </li>
      )}

      {items.map((submenuItem, submenuIndex) => (
        <li key={`submenu-item-${submenuIndex}`}>
          <Link
            href={
              submenuItem?.MenuLink?.story?.url !== undefined
                ? '/' + submenuItem?.MenuLink?.story?.url
                : submenuItem?.MenuLink?.url
            }
            prefetch={false}
          >
            {submenuItem?.MenuLabel}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const updatelist = (menu) => {
  const menulist = menu[0];
  if (!menulist || !Array.isArray(menu)) {
    return 'submenu-lists';
  }
  if (
    menulist?.ChildMenus4?.length > 0 &&
    menulist?.ChildMenus3?.length > 0 &&
    menulist?.ChildMenus2?.length > 0
  ) {
    return 'submenu-lists4';
  }
  if (menulist?.ChildMenus3?.length > 0 && menulist?.ChildMenus2?.length > 0) {
    return 'submenu-lists3';
  }
  if (menulist?.ChildMenus2?.length > 0) {
    return 'submenu-lists2';
  }
  return 'submenu-lists';
};

const MegaMenu = ({ menu, activeMenu, index }) => {
  const submenu = useRef(null);
  const listClass = updatelist(menu?.MegaMenu);

  useEffect(() => {
    if (submenu?.current?.style?.maxHeight) {
      submenu.current.style.maxHeight = null;
    } else {
      if (activeMenu === index) {
        submenu.current.style.maxHeight = submenu?.current?.scrollHeight + 'px';
      }
    }
  }, [activeMenu, index]);

  return (
    <div
      id='submenu'
      ref={submenu}
      className={`submenu submenu-collapse ${activeMenu === index ? 'submenu-show' : ''}`}
    >
      {menu?.MegaMenu?.length > 0 && (
        <ul className='axil-submenu'>
          <li className='submenu-container'>
            {menu?.MegaMenu.map((item, idx) => (
              <div className='submenu-content' key={idx}>
                {item?.Description && (
                  <>
                    <p className='submenu-content-title'>{item?.Title}</p>
                    <div className='submenu-content-desc'>{renderRichText(item?.Description)}</div>
                  </>
                )}
              </div>
            ))}

            <div className={listClass}>
              {menu?.MegaMenu.map((Item, Index) => {
                const childMenus = [
                  { items: Item?.ChildMenus, title: Item?.ChildMenusTitle },
                  { items: Item?.ChildMenus2, title: Item?.ChildMenus2Title },
                  { items: Item?.ChildMenus3, title: Item?.ChildMenus3Title },
                  { items: Item?.ChildMenus4, title: Item?.ChildMenus4Title },
                ];

                return (
                  <React.Fragment key={Index}>
                    {childMenus.map((menuItem, idx) => (
                      <SubMenuList
                        key={idx}
                        items={menuItem.items}
                        title={menuItem.title}
                        listClass={listClass}
                      />
                    ))}
                  </React.Fragment>
                );
              })}

              {/* ---------- Button Section ---------- */}
              {menu?.MegaMenu.map((item, idx) => (
                <div className='submenu-lists-btnwrapper' key={idx}>
                  {item?.LinkText && (
                    <Link
                      className='allbtn'
                      href={`/${
                        item?.Link?.story?.url !== undefined
                          ? item?.Link?.story?.url
                          : item?.Link?.url
                      }`}
                      prefetch={false}
                    >
                      {item?.LinkText && <p className='submenu-lists-btn'>{item?.LinkText}</p>}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default MegaMenu;
