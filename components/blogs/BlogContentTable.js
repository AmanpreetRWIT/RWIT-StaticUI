import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const BlogContentTable = ({ currentUrl, TableTitle, tableList, setTableList }) => {
  const router = useRouter();
  let [activeTab, setActiveTab] = useState('');

  const handleList = (e, item) => {
    e.preventDefault();
    setTimeout(() => {
      document.querySelectorAll('.active-blog')?.forEach((element) => {
        element?.classList?.remove('active-blog');
      });
      e?.target?.classList?.add('active-blog');
    }, 500);
    document.getElementById(item?.replace(/\s+/g, '-'))?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  };
  useEffect(() => {
    const container = document.getElementById('blogArea');
    if (!container) return;

    const buildTOC = () => {
      const h2Elements = [...container.querySelectorAll('h2')];
      if (!h2Elements.length) return false;

      h2Elements.forEach((h2) => {
        const text = h2?.textContent?.trim();
        if (text) {
          h2.id = text.replace(/\s+/g, '-');
        }
      });

      const tabList = h2Elements.map((h2) => h2?.textContent?.trim());
      if (JSON.stringify(tabList) !== JSON.stringify(tableList)) {
        setTableList(tabList);
      }
      return true;
    };

    if (buildTOC()) return;

    const observer = new MutationObserver(() => {
      if (buildTOC()) {
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [router?.asPath]);

  useEffect(() => {
    const container = document.getElementById('blogArea');
    if (!container) return;
    const sections = [...container.querySelectorAll('h2')];

    const onScroll = () => {
      const tabs = document.querySelectorAll('.tabs li');
      const scrollPosition = window.scrollY + 300;
      let newActiveTab = activeTab;
      sections.forEach((section) => {
        if (
          section?.offsetTop <= scrollPosition &&
          section?.offsetTop + section?.offsetHeight <= scrollPosition
        ) {
          newActiveTab = section?.id;
        }
      });
      if (newActiveTab !== activeTab) {
        setActiveTab(newActiveTab);
        tabs.forEach((tab) => {
          tab?.classList?.remove('active-blog');
          if (tab?.textContent?.replace(/\s+/g, '-') == `${newActiveTab}`) {
            tab?.classList?.add('active-blog');
          }
        });
      }
    };

    window.addEventListener('scroll', onScroll);
    // Trigger once in case user is already scrolled
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [router?.asPath, activeTab]);

  return (
    <>
      {tableList && tableList?.length > 0 && (
        <div id='blogTable' className='  col-lg-4 col-md-12 col-12'>
          <div className='blog-table axil-blog-details-area'>
            <div className='wrapper'>
              <h3>{TableTitle ? TableTitle : 'Table of Contents'}</h3>
              <div className='blog-table-list'>
                <ul className='tabs'>
                  {tableList?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={(e) => {
                          handleList(e, item);
                        }}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className='blog-table-social axil-blog-details-area'>
            <h3>Share On:</h3>
            <ul className='d-flex justify-content-start'>
              <li>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <i className='fab fa-facebook-f' />
                </a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M15.6953 15.9827L9.67676 7.21045L9.68703 7.21867L15.1136 0.931274H13.3002L8.87956 6.04876L5.36904 0.931274H0.613109L6.23196 9.12132L6.23128 9.12062L0.305176 15.9827H2.11859L7.03329 10.2892L10.9393 15.9827H15.6953ZM4.65052 2.29958L13.0949 14.6144H11.6578L3.20666 2.29958H4.65052Z'
                      fill='#050148'
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <i className='fab fa-linkedin-in' />
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogContentTable;
