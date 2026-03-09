import Link from 'next/link';
import Logo from '../common/Logo';
import Router from 'next/router';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const MainMenu = dynamic(() => import('./MainMenu'), { loading: () => <></> });

const MobileMenu = ({ menus, siteSettings, headerSetting, setIsMenuOpen }) => {
  const toggleMobileMenu = () => {
    const body = document.querySelector('body'),
      submenus = document.querySelectorAll(
        '.popup-mobile-manu .mainmenu .has-dropdown .axil-submenu',
      );

    const mainContent = document.querySelector('.main-content');
    const backdropMenu = document.querySelector('.backdrop-menu');

    body.classList.toggle('popup-mobile-manu-visible');
    if (body.classList.contains('popup-mobile-manu-visible')) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
      if (backdropMenu) mainContent.removeChild(backdropMenu);
    }

    let bootstrapJs;
    if (document !== undefined) {
      bootstrapJs = require('bootstrap');
    }

    submenus.forEach((menu) => {
      if (!menu.classList.contains('show')) {
        const openedCollapse = new bootstrapJs.Collapse(menu);
        openedCollapse.toggle();
      }
    });
  };

  const closeMobileMenu = () => {
    const body = document.querySelector('body');
    body.classList.remove('popup-mobile-manu-visible');
    if (body.classList.contains('.popup-mobile-manu-visible')) {
    }
    const mainContent = document.querySelector('.main-content');
    const backdropMenu = document.querySelector('.backdrop-menu');
    if (backdropMenu) mainContent?.removeChild(backdropMenu);
  };

  useEffect(() => {
    // Close menu while navigate to another page
    Router.events.on('routeChangeStart', closeMobileMenu);
    return () => {
      Router.events.off('routeChangeStart', closeMobileMenu);
    };
  }, []);

  return (
    <div
      id="popup-mobile-manu"
      className="popup-mobile-manu"
      onClick={(e) => {
        if (e.target == document.querySelector('.popup-mobile-manu')) {
          toggleMobileMenu();
        }
      }}
    >
      <div className="inner">
        <div className="mobileheader">
          {headerSetting && (
            <div className="logo">
              <Link href="/" prefetch={false}>
                <Logo
                  variant="two"
                  logoImage={headerSetting?.Logo?.filename || ''}
                  companyName={headerSetting?.CompanyName || ''}
                  tagline={headerSetting?.Tagline || ''}
                  width="250px"
                />
              </Link>
            </div>
          )}
          <button
            className="close-menu"
            onClick={() => {
              toggleMobileMenu();
            }}
          ></button>
        </div>

        {menus && (
          <div className="menu-item">
            <MainMenu menus={menus} />
          </div>
        )}

        <div
          id="mobile-btn"
          className="ax-header-button ml--20 ml_lg--10 d-sm-block"
        >
          {headerSetting?.headerMenus?.Buttons?.map(
            (headerBtn, headerBtnIndex) => (
              <Link
                key={headerBtnIndex}
                href={headerBtn.Link.url.startsWith('/') ? headerBtn.Link.url : `/${headerBtn.Link.url}`}
                class={`hoverable ${headerBtn.Class} ${headerBtn.ButtonColor} ${headerBtn.ButtonSize}`}
              >
                <span class={'button-text hoverable px-0'}>
                  {headerBtn.Label}
                </span>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
