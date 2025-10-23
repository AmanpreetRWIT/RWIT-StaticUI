import SectionTitle from '../common/SectionTitle';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import DoubleCheck from '../Icons/DoubleCheck';
import SlugData from '../../public/comparison.json';
import { extractCms } from '../../helpers/utilities';

const Comparison = ({ data }) => {
  const [isSlim, setIsSlim] = useState(data?.isSlim);
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState('strapi');
  const [selectedValue2, setSelectedValue2] = useState('prismic');
  const [disable, setDisable] = useState(false);
  const [openSelectId, setOpenSelectId] = useState(null);

  useEffect(() => {
    if (router?.pathname == '/comparison/[slug]') {
      const CmsArray = extractCms(router?.query?.slug);
      setSelectedValue(CmsArray[0]?.toLocaleLowerCase());
      setSelectedValue2(CmsArray[1]?.toLocaleLowerCase());
    }
  }, [router?.pathname,router?.query?.slug]);

  const options = data?.DropDownOne?.map((item) => ({
    value: item?.replace(/-/g, ''),
    label: item?.charAt(0)?.toUpperCase() + item?.slice(1)?.replace(/-/g, ' '),
  }));

  const [pageArray, setPageArray] = useState([]);

  const checkSlugAndRedirect = (slug) => {
    if (pageArray?.includes(slug) && pageArray?.length > 0) {
      router.push(`/comparison/${slug}`);
    } else {
      const reversedSlug = slug?.split('-')?.reverse()?.join('-');
      if (pageArray?.includes(reversedSlug) && pageArray?.length > 0) {
        router.push(`/comparison/${reversedSlug}`);
      } else {
        router.push(`/comparison/${slug}`);
      }
    }
  };

  useEffect(() => {
    const comparepages = SlugData?.map((item) => item?.slug);
    if (comparepages) {
      setPageArray(comparepages);
    }
  }, []);

  useEffect(() => {
    if (selectedValue.toLowerCase() === selectedValue2.toLowerCase()) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [selectedValue, selectedValue2, disable]);

  const handleChange1 = (e) => {
    setSelectedValue(e?.value);
  };
  const handleChange2 = (e) => {
    setSelectedValue2(e?.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disable) {
      const path = `${selectedValue?.toLocaleLowerCase()}-vs-${selectedValue2?.toLocaleLowerCase()}`;
      checkSlugAndRedirect(path);
    }
  };

  return (
    <div
      className={`comparison__wrapper ${
        isSlim ? 'comparison-slim__wrapper' : ''
      }`}
    >
      <div
        id="compare"
        className={`d-flex align-items-center ${
          isSlim ? 'compare-slim' : ''
        } }`}
        style={
          data?.BGColor
            ? { backgroundColor: data?.BGColor, minHeight: '200px' }
            : { minHeight: '200px' }
        }
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="position-relative">
                <SectionTitle
                  titleClass=""
                  title={data?.Title || ''}
                  subtitle={data?.Tags}
                  alignment="center"
                  description={data?.Description || ''}
                  titleColor={data?.HeadingColor || ''}
                  descriptionColor={data?.DescriptionColor || ''}
                />
              </div>

              <div className="compare">
                <form className="compare-form" onSubmit={handleSubmit} name="formname">
                  <div className="compare-select1">
                    {data?.LabelText && <span>{data?.LabelText}</span>}
                    <span
                      className={`compare-form-icon ${
                        openSelectId === 1 ? 'icon-rotate' : ''
                      }`}
                    >
                      <DoubleCheck />
                    </span>
                    <Select
                      isSearchable={true}
                      defaultValue={selectedValue}
                      placeholder={selectedValue}
                      value={selectedValue}
                      classNamePrefix
                      onChange={handleChange1}
                      options={options}
                      onMenuOpen={() => setOpenSelectId(1)}
                      onMenuClose={() => setOpenSelectId(null)}
                      aria-label={selectedValue}
                    />
                  </div>

                  <div className="compare-select2">
                    {data?.LabelText && <span>{data?.LabelText}</span>}
                    <span
                      className={`compare-form-icon ${
                        openSelectId === 2 ? 'icon-rotate' : ''
                      }`}
                    >
                      <DoubleCheck />
                    </span>
                    <Select
                      className="select"
                      isSearchable={true}
                      defaultValue={selectedValue2}
                      placeholder={selectedValue2}
                      value={selectedValue2}
                      onChange={handleChange2}
                      classNamePrefix
                      options={options}
                      onMenuOpen={() => setOpenSelectId(2)}
                      onMenuClose={() => setOpenSelectId(null)}
                      aria-label={selectedValue2}
                    />
                  </div>

                  {data?.ButtonText && (
                    <div className="form-group compare-btn">
                      <button
                        className={`hoverable axil-button w-100 btn-solid  ${
                          disable ? 'disable-btn' : ''
                        }`}
                      >
                        <span className="button-text hoverable px-0 button-text hoverable">
                          {data?.ButtonText}
                        </span>
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;
