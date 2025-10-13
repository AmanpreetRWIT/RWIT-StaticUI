import Link from 'next/link';
import { useMobile } from '../../helpers/utilities';

const Pagination = ({ postPerpage, totalPages, currentpage, handleClick }) => {
  const isMobile = useMobile();
  // `totalPages` is expected to be the number of pages (not total items).
  // Ensure it's numeric and at least 1.
  const pageCount = Math.max(1, Number(totalPages) || 1);
  const pages = [...Array(pageCount).keys()].map((num) => num + 1);
  const current = Number(currentpage) || 1;
  return (
    <div className="post-pagination">
      <nav className="navigation pagination">
        <div className="nav-links">
          <ul className="page-numbers">
            {/* Show previous button */}
            <li className="page-numbers">
              <Link
                href={current > 2 ? `/blog/page/${current - 1}` : '/blog'}
                legacyBehavior
              >
                <a
                  className={`page-numbers ${current === 1 ? 'disabled' : ''}`}
                  onClick={() => handleClick(current > 1 ? current - 1 : 1)}
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
                      className={`${num === current ? 'active' : ''}`}
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
                {pages?.slice(0, current < 4 ? 4 : 1).map((num) => (
                  <li key={num}>
                    <Link
                      href={num === 1 ? '/blog' : `/blog/page/${num}`}
                      legacyBehavior
                    >
                      <a
                        className={`${num === current ? 'active' : ''}`}
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
                {current > 3 && current <= pages?.length - 3 && (
                  <>
                    <li>
                      <Link
                        href={
                          current - 1 === 1 ? '/blog' : `/blog/page/${current - 1}`
                        }
                        legacyBehavior
                      >
                        <a
                          className={`${current - 1 === current ? 'active' : ''}`}
                          onClick={() => handleClick(current - 1)}
                        >
                          {current - 1}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={current === 1 ? '/blog' : `/blog/page/${current}`}
                        legacyBehavior
                      >
                        <a
                          className={`${current === current ? 'active' : ''}`}
                          onClick={() => handleClick(current)}
                        >
                          {current}
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/blog/page/${Number(current) + 1}`}
                        legacyBehavior
                      >
                        <a
                          className={`${Number(current) + 1 === Number(current) ? 'active' : ''}`}
                          onClick={() => handleClick(Number(current) + 1)}
                        >
                          {Number(current) + 1}
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
                  ?.slice(current > pages?.length - 3 ? pages?.length - 4 : pages?.length - 1, pages?.length)
                  .map((num) => (
                    <li key={num}>
                      <Link
                        href={num === 1 ? '/blog' : `/blog/page/${num}`}
                        legacyBehavior
                      >
                        <a
                          className={`${num === current ? 'active' : ''}`}
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
                href={current < pages?.length ? (current + 1 === 1 ? '/blog' : `/blog/page/${parseInt(current) + 1}`) : `/blog/page/${pages?.length}`}
                legacyBehavior
              >
                <a
                  className={`page-number ${current === pages?.length ? 'disabled' : ''}`}
                  onClick={() => handleClick(current < pages?.length ? current + 1 : pages?.length)}
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
