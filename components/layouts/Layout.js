import Header from './Header';
import { useEffect, useState } from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { isProduction } from '../../helpers/utilities';
import BacklinkPopup from '../popup/BacklinkPopup';
import Head from 'next/head';

const Footer = dynamic(() => import('./Footer'), { loading: <></> });

const Layout = ({
  layoutSettings = { header: '', footer: '', settings: '', notice: '' },
  children,
  showFooter = true,
}) => {
  const [isNotice, setNotice] = useState();
  const router = useRouter();
  const [showGtm, setShowGtm] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [hasBacklink, setHasBacklink] = useState(false);

  useEffect(() => {
    setIsPopupVisible(false);
  }, [router, isActive, isPopupVisible]);

  const handleClose = () => {
    setIsActive(false);
    setIsPopupVisible(false);
    setActiveModalIndex(null);
  };

  useEffect(() => {
    // from settings  notice data
    const NoticeFromSetting = {
      BadgeText: layoutSettings?.settings?.BadgeText || '',
      Content: layoutSettings?.settings?.Content || '',
      ShowBadge: layoutSettings?.settings?.ShowBadge || '',
      SectionBgColor: layoutSettings?.settings?.SectionBgColor || '',
      SectionTextColor: layoutSettings?.settings?.SectionTextColor || '',
      BadgeBgColor: layoutSettings?.settings?.BadgeBgColor || '',
      ShowNoticeSection: layoutSettings?.settings?.ShowNoticeSection || '',
      ShowCloseButton: layoutSettings?.settings?.ShowCloseButton || '',
    };
    setNotice(NoticeFromSetting);
  }, []);

  useEffect(() => {
    const currentDomain = window?.location?.hostname;
    if (currentDomain == 'www.rwit.io') {
      setShowGtm(true);
    } else {
      setShowGtm(false);
    }
  }, [router]);
  useEffect(() => {
    const mainWrapper = document?.querySelector('#__next');
    layoutSettings?.settings?.BackLinkModal?.forEach((modal, index) => {
      const ctaPopup = document?.getElementById(`backlink-popup${index + 1}`);
      const formBtn = ctaPopup?.querySelector('#FormButton');
      formBtn?.classList?.add('btn-solid');
      formBtn?.classList?.remove('btn-transparent');
      if (mainWrapper && ctaPopup) {
        mainWrapper?.appendChild(ctaPopup);
      }
    });
  }, []);

  useEffect(() => {
    const allLinks = document.querySelectorAll('a');
    if (allLinks?.length > 0) {
      const arr = [...allLinks];
      arr?.forEach((link) => {
        const url = link?.getAttribute('href');
        layoutSettings?.settings?.BackLinkModal?.forEach((modal, index) => {
          if (url === `/${modal?.BackLink}`) {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              setIsActive(true);
              setIsPopupVisible(true);
              setActiveModalIndex(index);
            });
          }
        });
      });
      const backlink = arr?.some((link) => {
        const url = link?.getAttribute('href');
        return layoutSettings?.settings?.BackLinkModal?.some((modal) => {
          return url === `/${modal?.BackLink}`;
        });
      });
      setHasBacklink(backlink);
    }
  }, [router]);

  return (
    <>
      <Head>
        <meta name='twitter:site' content={layoutSettings?.settings?.SiteCreator || ''} />
        <meta name='twitter:creator' content={layoutSettings?.settings?.SiteCreator || ''} />
      </Head>
      <div className='main-content'>
        {layoutSettings?.settings?.GTMID && showGtm && isProduction && (
          <GoogleTagManager gtmId={layoutSettings?.settings?.GTMID} />
        )}
        <Header
          headerSetting={layoutSettings.header}
          siteSettings={layoutSettings.settings}
          noticeData={isNotice}
        />
        <main>{children}</main>
        {showFooter && <Footer footerSetting={layoutSettings.footer} />}
        {hasBacklink && (
          <div id='global-popup'>
            {layoutSettings?.settings?.BackLinkModal?.map((modal, index) => {
              return (
                <BacklinkPopup
                  key={index}
                  index={index}
                  modal={modal}
                  isActive={isActive}
                  activeModalIndex={activeModalIndex === index}
                  setIsActive={setIsActive}
                  isPopupVisible={isPopupVisible}
                  setIsPopupVisible={setIsPopupVisible}
                  handleClose={handleClose}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
