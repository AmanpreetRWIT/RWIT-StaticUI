import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const MegaMenu = ({ menu, activeMenu, index }) => {
  const updatelist = (menu) => {
    const menulist = menu[0];
    if (!menulist || !Array.isArray(menu)) return 'submenu-lists';

    if (
      menulist?.ChildMenus4?.length > 0 &&
      menulist?.ChildMenus3?.length > 0 &&
      menulist?.ChildMenus2?.length > 0
    ) return 'submenu-lists4';
    if (menulist?.ChildMenus3?.length > 0 && menulist?.ChildMenus2?.length > 0)
      return 'submenu-lists3';
    if (menulist?.ChildMenus2?.length > 0) return 'submenu-lists2';
    return 'submenu-lists';
  };

  const submenu = useRef(null);

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
      id="submenu"
      ref={submenu}
      className={`submenu submenu-collapse ${activeMenu === index ? 'submenu-show' : ''}`}
    >
      {menu?.MegaMenu?.length > 0 && (
        <ul className="axil-submenu">
          <li className="submenu-container">
            {menu.MegaMenu.map((item, index) => (
              <div className="submenu-content" key={index}>
                {item?.Description && (
                  <>
                    <p className="submenu-content-title">{item?.Title}</p>
                    <div className="submenu-content-desc">{item?.Description}</div>
                  </>
                )}
              </div>
            ))}

            <div className={`${updatelist(menu?.MegaMenu)}`}>
              {menu.MegaMenu.map((Item, Index) => (
                <React.Fragment key={Index}>
                  {Item?.ChildMenus?.length > 0 && (
                    <ul className={`${updatelist(menu?.MegaMenu)}-container`}>
                      {Item?.ChildMenusTitle && (
                        <li className="submenu-list-title">
                          <span className={`submenu-list-title-span-${updatelist(menu?.MegaMenu)}`}>
                            {Item?.ChildMenusTitle}
                          </span>
                        </li>
                      )}
                      {Item.ChildMenus.map((submenuItem, submenuIndex) => (
                        <li key={`submenu-item-${submenuIndex}`}>
                          <Link href={submenuItem?.MenuLink?.url} prefetch={false}>
                            {submenuItem?.MenuLabel}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {Item?.ChildMenus2?.length > 0 && (
                    <ul className={`${updatelist(menu?.MegaMenu)}-container`}>
                      {Item?.ChildMenus2Title && (
                        <li className="submenu-list-title">
                          <span className={`submenu-list-title-span-${updatelist(menu?.MegaMenu)}`}>
                            {Item?.ChildMenus2Title}
                          </span>
                        </li>
                      )}
                      {Item.ChildMenus2.map((submenuItem, submenuIndex) => (
                        <li key={`submenu-item-${submenuIndex}`}>
                          <Link href={submenuItem?.MenuLink?.url} prefetch={false}>
                            {submenuItem?.MenuLabel}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {Item?.ChildMenus3?.length > 0 && (
                    <ul className={`${updatelist(menu?.MegaMenu)}-container`}>
                      {Item?.ChildMenus3Title && (
                        <li className="submenu-list-title">
                          <span className={`submenu-list-title-span-${updatelist(menu?.MegaMenu)}`}>
                            {Item?.ChildMenus3Title}
                          </span>
                        </li>
                      )}
                      {Item.ChildMenus3.map((submenuItem, submenuIndex) => (
                        <li key={`submenu-item-${submenuIndex}`}>
                          <Link href={submenuItem?.MenuLink?.url} prefetch={false}>
                            {submenuItem?.MenuLabel}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {Item?.ChildMenus4?.length > 0 && (
                    <ul className={`${updatelist(menu?.MegaMenu)}-container`}>
                      {Item?.ChildMenus4Title && (
                        <li className="submenu-list-title">
                          <span className={`submenu-list-title-span-${updatelist(menu?.MegaMenu)}`}>
                            {Item?.ChildMenus4Title}
                          </span>
                        </li>
                      )}
                      {Item.ChildMenus4.map((submenuItem, submenuIndex) => (
                        <li key={`submenu-item-${submenuIndex}`}>
                          <Link href={submenuItem?.MenuLink?.url} prefetch={false}>
                            {submenuItem?.MenuLabel}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </React.Fragment>
              ))}

              {menu.MegaMenu.map((item, index) => (
                <div className="submenu-lists-btnwrapper" key={index}>
                  {item?.LinkText && (
                    <Link className="allbtn" href={item?.Link?.url} prefetch={false}>
                      <p className="submenu-lists-btn">{item?.LinkText}</p>
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
