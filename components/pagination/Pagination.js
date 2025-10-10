import Link from 'next/link';
import { useMobile } from '../../helpers/utilities';

const Pagination = ({ postPerpage, totalPages, currentpage, handleClick }) => {
  const isMobile = useMobile();
  const pageCount = Math.ceil(totalPages / postPerpage);
  const pages = [...Array(pageCount).keys()].map((num) => num + 1);
  return (
    <div className="post-pagination">
      <nav className="navigation pagination">
        <div className="nav-links">
          <ul className="page-numbers">
            {/* Show previous button */}
            <li className="page-numbers">
              <Link
                href={
                  currentpage > 2
                    ? `/blog/page/${currentpage - 1}`
                    : '/blog'
                }
                legacyBehavior
              >
                <a
                  className={`page-numbers ${
                    currentpage === 1 ? 'disabled' : ''
                  }`}
                  onClick={() =>
                    handleClick(currentpage > 1 ? currentpage - 1 : 1)
                  }
                >
                  <i className="fas fa-angle-left"></i>
                </a>
              </Link>
            </li>
            {/* Show simple pagination when total pages are less than or equal to 8 */}
            {pages?.length <= (isMobile ? 7 : 8) &&
              pages?.map((num) => (
                <li key={num}>
                  <Link
                    href={num === 1 ? '/blog' : `/blog/page/${num}`}
                    legacyBehavior
                  >
                    <a
                      className={`${num === Number(currentpage) ? 'active' : ''
                        }`}
                      onClick={() => handleClick(num)}
                    >
                      {num}
                    </a>
                  </Link>
                </li>
              ))}

            {/* Show pagination when total pages are greater than 8 */}
            {pages?.length > (isMobile ? 7 : 8) && (
              <>
                {pages?.slice(0, currentpage < 4 ? 4 : 1).map((num) => (
                  <li key={num}>
                    <Link
                      href={num === 1 ? '/blog' : `/blog/page/${num}`}
                      legacyBehavior
                    >
                      <a
                        className={`${num === Number(currentpage) ? 'active' : ''
                          }`}
                        onClick={() => handleClick(num)}
                      >
                        {num}
                      </a>
                    </Link>
                  </li>
                ))}
                <li className="page">
                  <span className="linkspan">...</span>
                </li>

                {/* Show middle pages */}
                {currentpage > 3 && currentpage <= pages?.length - 3 && (
                  <>
                    <li>
                      <Link
                        href={
                          currentpage - 1 === 1
                            ? '/blog'
                            : `/blog/page/${currentpage - 1}`
                        }
                        legacyBehavior
                      >
                        <a
                          className={`${currentpage - 1 === Number(currentpage)
                              ? 'active'
                              : ''
                            }`}
                          onClick={() => handleClick(currentpage - 1)}
                        >
                          {currentpage - 1}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={
                          currentpage === 1
                            ? '/blog'
                            : `/blog/page/${currentpage}`
                        }
                        legacyBehavior
                      >
                        <a
                          className={`${currentpage === currentpage ? 'active' : ''
                            }`}
                          onClick={() => handleClick(currentpage)}
                        >
                          {currentpage}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/blog/page/${Number(currentpage) + 1}`}
                        legacyBehavior
                      >
                        <a
                          className={`${Number(currentpage) + 1 === Number(currentpage)
                              ? 'active'
                              : ''
                            }`}
                          onClick={() => handleClick(Number(currentpage) + 1)}
                        >
                          {Number(currentpage) + 1}
                        </a>
                      </Link>
                    </li>

                    <li className="page">
                      <span className="linkspan">...</span>
                    </li>
                  </>
                )}

                {/* Show last page */}
                {pages
                  ?.slice(
                    currentpage > pages?.length - 3
                      ? pages?.length - 4
                      : pages?.length - 1,
                    pages?.length
                  )
                  .map((num) => (
                    <li key={num}>
                      <Link
                        href={num === 1 ? '/blog' : `/blog/page/${num}`}
                        legacyBehavior
                      >
                        <a
                          className={`${num === Number(currentpage) ? 'active' : ''
                            }`}
                          onClick={() => handleClick(num)}
                        >
                          {num}
                        </a>
                      </Link>
                    </li>
                  ))}
              </>
            )}
            {/* Show Next button */}
            <li className="page-numbers">
              <Link
                href={
                  currentpage < pages?.length
                    ? currentpage + 1 === 1
                      ? '/blog'
                      : `/blog/page/${parseInt(currentpage) + 1}`
                    : `/blog/page/${pages?.length}`
                }
                legacyBehavior
              >
                <a
                  className={`page-number ${Number(currentpage) === pages?.length ? 'disabled' : ''
                    }`}
                  onClick={() =>
                    handleClick(
                      currentpage < pages?.length
                        ? currentpage + 1
                        : pages?.length
                    )
                  }
                >
                  <i className="fas fa-angle-right"></i>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
