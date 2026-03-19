import Link from "next/link";
import { SearchComponent } from "../search/Search";
import { useRouter } from "next/router";

const Breadcrumb = ({
  title = "",
  root = "Home",
  rootUrl = "/",
  current = "",
  description = "",
  BGColor = "",
  TextColor = "",
  showBreadcrumb = false,
  isCategory,
  showSearch = false,
  alignment = "left",
  showSpan = true,
}) => {
  const router = useRouter();

  return (
    <div
      className="axil-breadcrumb-area   breadcrumb-style-default pt--170 pb--70 theme-gradient"
      style={BGColor?.color ? { background: BGColor?.color } : {}}
    >
      <div
        className={`container breadcrumb-align-${alignment} breadcrumb-padding-top`}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="inner">
              {!showBreadcrumb && (
                <ul className="axil-breadcrumb liststyle d-flex">
                  <li className="axil-breadcrumb-item">
                    <Link href={rootUrl} legacyBehavior>
                      {root}
                    </Link>
                  </li>
                  <span className={`axial-breadcrumb-${showSpan}`}>{">"}</span>
                  <li
                    className="axil-breadcrumb-item text-capitalize active"
                    aria-current="page"
                  >
                    {current}
                  </li>
                </ul>
              )}
              <div className={`row`}>
                {title && (
                  <h1
                    className="axil-page-title text-capitalize breadcrumb-title"
                    style={TextColor?.color ? { color: TextColor?.color } : {}}
                  >
                    {isCategory && "Category: "}
                    {title}
                  </h1>
                )}
                {description && (
                  <div className="desc text-capitalize">{description}</div>
                )}
                {showSearch && (
                  <div
                    className={`${
                      router?.asPath === "/blog" ||
                      router?.asPath === "/blog/page/1"
                        ? "blogSearch__wrapper"
                        : ""
                    }`}
                  >
                    <SearchComponent />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
