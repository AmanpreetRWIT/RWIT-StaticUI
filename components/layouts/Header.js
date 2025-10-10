import Link from 'next/link';
import { useEffect, useState } from 'react';
import Notice from '../notice/Notice';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getShortCode } from '../../helpers/utilities';
import MainMenu from './MainMenu';
import MobileMenu from './MobileMenu';
import Logo from '../common/Logo';

const Header = ({
  headerSetting = {},
  siteSettings,
  noticeData,
}) => {
  const [headerSettings, setHeaderSettings] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const headerContainerClass = () => {
    if (headerSetting.style === 'one') return 'container';
    else if (headerSetting.style === 'two')
      return 'container-fluid plr--100 plr_lg--30 plr_md--30 plr_sm--10';
    else if (headerSetting.style === 'three') return 'container';
    else return 'container';
  };

  const [sessionValue, setSessionValue] = useState('Global');
  const [activeIcon, setActiveIcon] = useState(
     '/images/Global.svg'
  );

  useEffect(() => {
    const savedLocale = sessionStorage.getItem('locale');
    const savedSessionValue = sessionStorage.getItem('sessionValue');

    if (savedLocale && savedSessionValue) {
      setSessionValue(savedSessionValue);
    }
  }, []);

  const toggleSearch = (e) => {
    e.preventDefault();
    const searchArea = document.querySelector('.axil-search-area');
    searchArea.classList.toggle('visible');
  };

  const toggleSideNav = () => {
    const html = document.querySelector('html'),
      sideNav = document.querySelector('.side-nav');

    sideNav.classList.toggle('opened');
    html.classList.toggle('side-nav-opened');
  };

  const toggleMobileMenu = () => {
    const body = document.querySelector('body');
    body.classList.toggle('popup-mobile-manu-visible');
    const mainContent = document.querySelector('.main-content');
    const backdropMenu = document.createElement('div');
    if (body.classList.contains('popup-mobile-manu-visible')) {
      setIsMenuOpen(true);
      backdropMenu.classList.add('backdrop-menu');
      mainContent.setAttribute('style', 'position: relative;');
      setTimeout(() => mainContent.appendChild(backdropMenu), 200);
    } else {
      setIsMenuOpen(false);
      mainContent.removeChild(backdropMenu);
    }
  };

  useEffect(() => {
    if (headerSetting === '') {
      const setting = {
        style: 'one',
        leftColumn: 'col-lg-3 col-md-6 col-sm-6 col-8 header-left',
        rightColumn: 'col-lg-9 col-md-6 col-sm-6 col-4 header-right',
      };
      setHeaderSettings(setting);
    } else {
      setHeaderSettings(headerSetting);
    }
  }, [headerSetting, setHeaderSettings]);

  useEffect(() => {
    const header = document.querySelector('header.ax-header');

    const handleStickyClass = () => {
      if (window.pageYOffset > 250) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleStickyClass);

    return () => {
      window.removeEventListener('scroll', handleStickyClass);
    };
  }, []);

  useEffect(() => {
    const closeSidenavOnClickOverlay = () => {
      const html = document.querySelector('html'),
        body = document.querySelector('body'),
        sideNav = document.querySelector('.side-nav');

      body.addEventListener('click', function (e) {
        if (e.target.tagName === 'BODY') {
          sideNav.classList.remove('opened');
          html.classList.remove('side-nav-opened');
        }
      });
    };

    closeSidenavOnClickOverlay();
  }, []);

  useEffect(() => {
    if (!sessionStorage.getItem('locale')) {
      const getLocaleFromPath = () => {
        const path = window.location.pathname;
        const localeMatch = path.match(/\/([a-z]{2})(\/|$)/);
        if (localeMatch && localeMatch[1]) {
          let locale = localeMatch[1];
          if (!['en', 'us'].includes(locale)) {
            locale = 'en';
          }
          sessionStorage.setItem('locale', locale);
          const sessionValue = locale === 'en' ? 'Global' : 'USA';
          sessionStorage.setItem('sessionValue', sessionValue);
          setSessionValue(sessionValue);
          return locale;
        }
        return null;
      };
      getLocaleFromPath();
    }
  }, []);

  const switchLanguage = (Tab, e) => {
    if (sessionValue === Tab?.text) {
      e.preventDefault();
      return;
    }

    let newLocale;
    switch (Tab?.text) {
      case 'USA':
        newLocale = 'us';
        break;
      default:
        newLocale = 'en';
    }

    const newSessionValue = newLocale === 'en' ? 'Global' : Tab?.text;

    sessionStorage.setItem('locale', newLocale);
    sessionStorage.setItem('sessionValue', newSessionValue);

    router.replace(router.asPath, router.asPath, { locale: newLocale });

    setSessionValue(newSessionValue);
    handleSidenav();
    window.location.reload();
  };

  useEffect(() => {
    const locale = sessionStorage.getItem('locale');
    const headerLinks = document.querySelectorAll('header a');
    headerLinks?.forEach((link) => {
      if (link?.href && link?.href?.includes('blog')) {
        const newLink = locale ? link?.href?.replace(`/${locale}`, '') : link?.href;
        link.href = newLink;
      }
    });
  }, [router]);

  const handleSidenav = () => {
    const sideNav = document.querySelector('.sidenav-wrapper');
    const sideNavContent = document.querySelector('.sidenav-content');
    sideNav.classList.toggle('sidenav-opened');
    sideNavContent.classList.toggle('sidenav-slide');
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        const sideNav = document.querySelector('.sidenav-wrapper');
        const sideNavContent = document.querySelector('.sidenav-content');
        sideNav?.classList.remove('sidenav-opened');
        sideNavContent?.classList.remove('sidenav-slide');
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <>
      {noticeData && (
        <div className={`active-banner`}>
          <Notice noticeData={noticeData} />
        </div>
      )}

      <header className={`ax-header haeder-default light-logo-version header-transparent axil-header-sticky`}>
        <div className="header-wrapper">
          <div className={headerContainerClass()}>
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-6 col-sm-6 col-8 header-left">
                <div className="logo">
                  <Link href="/" prefetch={false}>
                    <Logo
                      variant={headerSettings.style === 'four' ? 'two' : 'one'}
                      logoImage={siteSettings?.Logo || ''}
                      companyName={siteSettings?.CompanyName || ''}
                      tagline={siteSettings?.Tagline || ''}
                      alt={siteSettings?.LogoAlt || ''}
                    />
                  </Link>
                </div>
              </div>

              {headerSetting.headerMenus?.Menus &&
                headerSettings.style === 'two' && (
                  <div className="col-lg-7 col-xl-6 d-none d-lg-block">
                    <div className="mainmenu-wrapepr justify-content-center">
                      <nav className="mainmenu-nav d-none d-lg-block">
                        <MainMenu menus={headerSetting.headerMenus?.Menus} />
                      </nav>
                    </div>
                  </div>
                )}

              <div className="col-lg-9 col-md-6 col-sm-6 col-4 header-right">
                <div className={`mainmenu-wrapepr ${headerSettings.style === 'two' ? 'justify-content-end' : ''}`}>
                  {(headerSettings.style === 'one' || headerSettings.style === 'four') &&
                    headerSetting.headerMenus?.Menus && (
                      <nav className="mainmenu-nav d-none d-lg-block">
                        <MainMenu menus={headerSetting.headerMenus?.Menus} />
                      </nav>
                    )}

                  <div className="axil-header-extra d-flex align-items-center">
                    {headerSettings.style === 'three' && (
                      <div className="d-none d-md-block">
                        <ul className="axil-social-icons d-flex liststyle align-items-center">
                          <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                          <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                          <li><Link href="#"><i className="fab fa-pinterest-p" /></Link></li>
                          <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                        </ul>
                      </div>
                    )}

                    {headerSettings.style === 'four' && (
                      <div className="ax-header-button  ml_lg--10  header-btn">
                        {headerSetting.headerMenus?.Buttons?.map((headerBtn, headerBtnIndex) => (
                          <a
                            key={headerBtnIndex}
                            href={headerBtn.Link || '#'}
                            className={headerBtn.className || 'btn'}
                          >
                            {headerBtn.Label || 'Button'}
                          </a>
                        ))}
                      </div>
                    )}

                    {activeIcon && (
                      <div className="sidenav-toggle" onClick={handleSidenav}>
                        <Image src={activeIcon} alt="regionIcon" width={32} height={32} />
                        <span>{getShortCode(sessionValue)}</span>
                      </div>
                    )}

                    <div className={`${headerSettings.style === 'three'
                        ? 'ax-hamburger bg-theme-color ml--40'
                        : 'ax-menubar popup-navigation-activation d-block d-lg-none ml_sm--20 ml_md--20'
                      }`}
                    >
                      <div
                        className={`${headerSettings.style === 'three' ? 'axil-menuToggle popup-navigation-activation' : ''}`}
                        onClick={toggleMobileMenu}
                      >
                        {headerSettings.style === 'three' ? (
                          <>
                            <span />
                            <span />
                            <span />
                          </>
                        ) : (
                          <i />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidenav">
          <div className="sidenav-wrapper" onClick={handleSidenav}></div>
          <div className="sidenav-content">
            <div className="sidenav-close" onClick={handleSidenav}>
              <svg width="28" height="28" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 13L39 39M13 39L39 13" stroke="#000248" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="sidenav-background">
              <div className="sidenav-heading">
                {siteSettings?.NavTitle && <h2>{siteSettings.NavTitle}</h2>}
                {siteSettings?.NavSubTitle && <p>{siteSettings.NavSubTitle}</p>}
              </div>
              <div className="sidenav-switch">
                {siteSettings?.NavMenu?.map((Tab, index) => (
                  <button
                    className={`sidenav-tab ${sessionValue === Tab?.text ? 'sidenav-active' : ''}`}
                    key={index}
                    onClick={(e) => switchLanguage(Tab, e)}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <span>
                      <Image src={Tab?.image || '/images/Global.svg'} alt="" width={48} height={48} />
                      {Tab?.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {(headerSetting.headerMenus?.Menus || siteSettings) && (
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          headerSetting={headerSetting}
          menus={headerSetting.headerMenus?.Menus}
          siteSettings={siteSettings}
          headerSettings={headerSettings}
        />
      )}
    </>
  );
};

export default Header;
