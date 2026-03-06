import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { formatDateString, renderRichText } from '../../helpers/utilities';

const updatelist = (menu) => {
  const menulist = menu?.[0];
  if (!menulist || !Array.isArray(menu)) {
    return 'megamenu-lists';
  }
  if (
    menulist?.ChildMenus4?.length > 0 &&
    menulist?.ChildMenus3?.length > 0 &&
    menulist?.ChildMenus2?.length > 0
  ) {
    return 'megamenu-lists4';
  }
  if (menulist?.ChildMenus3?.length > 0 && menulist?.ChildMenus2?.length > 0) {
    return 'megamenu-lists3';
  }
  if (menulist?.ChildMenus2?.length > 0) {
    return 'megamenu-lists2';
  }
  return 'megamenu-lists';
};

const FeaturedBlogContent = ({ blogToShow }) => {
  if (!blogToShow) return null;
  const blogImage = blogToShow?.content?.FeaturedImage || blogToShow?.content?.ThumbnailImage;

  return (
    <>
      {blogImage?.filename && (
        <Image
          src={blogImage?.filename}
          alt={blogImage?.alt || 'logo'}
          width={338}
          height={175}
          className='megamenu-content-img'
        />
      )}

      <div className='megamenu-content-btm'>
        {blogToShow?.name && <p className='megamenu-content-title'>{blogToShow?.name}</p>}

        <div className='megamenu-content-link'>
          {(blogToShow?.published_at ||
            blogToShow?.first_published_at ||
            blogToShow?.created_at) && (
            <span className='megamenu-content-date'>
              {formatDateString(
                blogToShow?.published_at || blogToShow?.first_published_at || blogToShow?.created_at
              )}
            </span>
          )}

          {blogToShow?.full_slug && (
            <Link
              href={'/' + blogToShow?.full_slug}
              className='megamenu-content-readMore'
              locale={false}
            >
              Read More
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

const DesktopMegaMenu = ({ menu }) => {
  const latestFeaturedBlog = require('../../public/latestFeaturedBlog.json');
  const getBlogToShow = (item) => {
    return latestFeaturedBlog || item?.FeaturedBlogs?.[0] || null;
  };

  const [activeSubMenu, setActiveSubMenu] = useState(0);
  const [lineStyle, setLineStyle] = useState({});
  const itemsRef = useRef(null);

  if (itemsRef.current === null) {
    itemsRef.current = new Map();
  }

  useEffect(() => {
    const activeItem = itemsRef.current.get(activeSubMenu);
    if (activeItem) {
      setLineStyle({
        top: activeItem.offsetTop,
        height: activeItem.offsetHeight,
      });
    }
  }, [activeSubMenu]);

  if (!menu?.MegaMenu?.length) return null;

  return (
    <ul className='axil-submenu desktop-megamenu' id='desktop-megamenu'>
      <li className='megamenu-container'>
        {/* Tab Panels */}
        {menu.MegaMenu.map((Item, Index) => {
          const subMenus = [
            {
              title: Item?.ChildMenusTitle,
              description: Item?.ChildMenu1Description,
              menus: Item?.ChildMenus,
            },
            {
              title: Item?.ChildMenus2Title,
              description: Item?.ChildMenu2Description,
              menus: Item?.ChildMenus2,
            },
            {
              title: Item?.ChildMenus3Title,
              description: Item?.ChildMenu3Description,
              menus: Item?.ChildMenus3,
            },
            {
              title: Item?.ChildMenus4Title,
              description: Item?.ChildMenu4Description,
              menus: Item?.ChildMenus4,
            },
          ];

          const layout = Item?.Layout;
          return (
            <div
              key={Index}
              className={` ${
                layout === 'layout2' || layout === 'layout3'
                  ? 'megamenu-menuWrap megamenu-lists'
                  : 'megamenu-menuWrap '
              } `}
            >
              {layout === 'layout1' && (
                <div className='megamenu-asideWrap'>
                  <ul className={`${updatelist(menu?.MegaMenu)}-container`}>
                    <span className='megamenu-list-spanLine' style={lineStyle}></span>
                    {subMenus.map(
                      (section, idx) =>
                        section?.title && (
                          <li
                            className={`megamenu-list-title ${
                              activeSubMenu === idx ? 'active' : ''
                            }`}
                            key={idx}
                            onMouseEnter={() => setActiveSubMenu(idx)}
                            ref={(node) => {
                              if (node) {
                                itemsRef.current.set(idx, node);
                              } else {
                                itemsRef.current.delete(idx);
                              }
                            }}
                          >
                            <span
                              className={`megamenu-list-title-span-${updatelist(menu?.MegaMenu)}`}
                            >
                              {section?.title}
                            </span>
                            <p className='megamenu-list-desc'>{section?.description}</p>
                          </li>
                        )
                    )}
                  </ul>
                </div>
              )}

              {subMenus.map(
                (section, idx) =>
                  activeSubMenu === idx &&
                  section?.menus?.length > 0 && (
                    <ul key={idx} className='megamenu-menuLinks'>
                      {section.menus.map((submenuItem, submenuIndex) => (
                        <li key={submenuIndex}>
                          <Link
                            href={
                              submenuItem?.MenuLink?.story?.url !== undefined
                                ? '/' + submenuItem?.MenuLink?.story?.url
                                : submenuItem?.MenuLink?.url || '#'
                            }
                            prefetch={false}
                            className='megamenu-menuLink'
                          >
                            {submenuItem?.MenuImage?.filename && (
                              <Image
                                src={submenuItem?.MenuImage?.filename}
                                alt={submenuItem?.MenuImage?.alt || 'menu icon'}
                                width={72}
                                height={72}
                              />
                            )}
                            <div>
                              {submenuItem?.MenuLabel && (
                                <p className='megamenu-menuLink-title'>{submenuItem?.MenuLabel}</p>
                              )}
                              {submenuItem?.MenuDescription && (
                                <p className='megamenu-menuLink-desc'>
                                  {submenuItem?.MenuDescription}
                                </p>
                              )}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )
              )}

              {/* For General Info */}
              {layout === 'layout3' &&
                subMenus.filter((section) => section?.menus?.length > 0).length < 2 && (
                  <div className='megamenu-content'>
                    {Item?.BackgroundImage?.filename && (
                      <Image
                        src={Item?.BackgroundImage?.filename}
                        alt='logo'
                        width={338}
                        height={175}
                        className='megamenu-content-img'
                      />
                    )}
                    <div className='megamenu-content-btm'>
                      {Item?.Title && <p className='megamenu-content-title'>{Item.Title}</p>}

                      {Item?.Description && (
                        <p className='megamenu-content-desc'>{renderRichText(Item.Description)}</p>
                      )}
                    </div>
                  </div>
                )}

              {/* For Blog Layout */}
              {layout === 'layout2' && getBlogToShow(Item) && (
                <div className='megamenu-content megamenu-content--blog '>
                  <FeaturedBlogContent blogToShow={getBlogToShow(Item)} />
                </div>
              )}
            </div>
          );
        })}
      </li>
    </ul>
  );
};

export default DesktopMegaMenu;
