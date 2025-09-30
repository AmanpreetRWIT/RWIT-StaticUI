import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const camelCaseToDashed = (string) => {
  const dashedString = string?.replace(/\s+/g, '-').toLowerCase();
  return dashedString;
};

const flatDeep = (arr, d = 1) =>
  d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr?.slice();

const slugify = (text) => {
  return text
    ?.toString()
    ?.toLowerCase()
    ?.replace(/\s+/g, '-') // Replace spaces with -
    ?.replace(/[^\w-]+/g, '') // Remove all non-word chars
    ?.replace(/--+/g, '-') // Replace multiple - with single -
    ?.replace(/^-+/, '') // Trim - from start of text
    ?.replace(/-+$/, ''); // Trim - from end of text
};

const containsObject = (obj, list) => {
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i].slug === obj.slug) {
      return i;
    }
  }

  return -1;
};

const getCategories = (blogs) => {
  let allPosts = blogs.map((item) => item.postdata),
    cats = allPosts.map((item) => item.categories),
    singleCatArray = flatDeep(cats),
    categories = [];

  singleCatArray.forEach((cat) => {
    const obj = {
        title: cat.trim(),
        slug: slugify(cat),
        count: 1,
      },
      objIndex = containsObject(obj, categories);

    if (objIndex !== -1) {
      const prevCount = categories[objIndex].count;

      categories[objIndex] = {
        title: cat.trim(),
        slug: slugify(cat),
        count: prevCount + 1,
      };
    } else {
      categories.push(obj);
    }
  });

  return categories;
};

const getTags = (blogs) => {
  let allPosts = blogs.map((item) => item.postdata),
    allTags = allPosts.map((item) => item.tags),
    singleTagArray = flatDeep(allTags),
    tags = [];

  singleTagArray.forEach((tag) => {
    const obj = {
        title: tag.trim(),
        slug: slugify(tag),
        count: 1,
      },
      objIndex = containsObject(obj, tags);

    if (objIndex !== -1) {
      const prevCount = tags[objIndex].count;

      tags[objIndex] = {
        title: tag.trim(),
        slug: slugify(tag),
        count: prevCount + 1,
      };
    } else {
      tags.push(obj);
    }
  });

  return tags;
};

const sortingByDate = function (posts) {
  return posts.sort((a, b) => {
    const beforeDate = DateTime.fromFormat(
      a.postdata.publishedAt,
      'LLL dd yyyy'
    );
    const afterDate = DateTime.fromFormat(
      b.postdata.publishedAt,
      'LLL dd yyyy'
    );
    return afterDate - beforeDate;
  });
};

export const getImageDimension = (url, width = 0, height = 0) => {
  try {
    const widthAndHeight = url.split('/')[5];

    if (widthAndHeight.split('x')[0] && widthAndHeight.split('x')[1]) {
      return {
        width: widthAndHeight.split('x')[0],
        height: widthAndHeight.split('x')[1],
      };
    } else {
      return {
        width: width,
        height: height,
      };
    }
  } catch (error) {
    return {
      width: 0,
      height: 0,
    };
  }
};

let monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const formatDateString = (inputDate) => {
  if (!inputDate) return;
  const dateObject = new Date(inputDate);
  const month = dateObject.getMonth().toString();
  const day = dateObject.getDate().toString().padStart(2, '0');
  const year = dateObject.getFullYear();
  return `${monthNames[month]} ${day} ${year}`;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isProduction = process.env.NODE_ENV == 'production';

export function trimKeywords(inputString) {
  // Split the input string by comma and trim each part
  if (inputString?.length <= 0 || inputString?.length == undefined) return;
  const trimmedKeywords = inputString
    .split(',')
    .map((keyword) => keyword.trim());
  // Join the trimmed keywords back together with a comma and space
  return trimmedKeywords.join(', ');
}
export function trimArticleKeywords(inputString) {
  if (!inputString) return []; // Return an empty array if input is invalid
  return inputString.split(',').map((keyword) => keyword.trim());
}
const getButtonClassNames = (blok) => {
  let classNames = 'hoverable axil-button';

  const url = blok?.Link?.story?.url || blok?.Link?.url || '';

  if (url.includes('case-study/')) {
    classNames += ' casestudy_btn';
  }

  if (url.includes('calendly')) {
    classNames += ' meeting_btn';
  }

  return classNames;
};
const separateSearchParams = (url) => {
  const params = url;
  const obj = {};

  if (params) {
    const arr = params?.split('&');

    for (let i = 0; i < arr.length; i++) {
      const [key, value] = arr[i].split('=');
      obj[key] = value;
    }
  }

  return obj;
};

const europeanCountries = [
  'AL',
  'AD',
  'AT',
  'BY',
  'BE',
  'BA',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'GE',
  'DE',
  'GI',
  'GR',
  'HU',
  'IS',
  'IE',
  'IT',
  'LV',
  'LI',
  'LT',
  'LU',
  'MK',
  'MT',
  'MD',
  'MC',
  'ME',
  'NL',
  'NO',
  'PL',
  'PT',
  'RO',
  'RU',
  'SM',
  'RS',
  'SK',
  'SI',
  'ES',
  'SE',
  'CH',
  'UA',
  'VA',
];

const reverseSlug = (str) => str.split('-').reverse().join('-');

const isProd = () => {
  if (process.env.NODE_ENV === 'production') {
    return true;
  } else {
    return false;
  }
};

const placeholderLight =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjeP/+/X8ACWsDzWO51SAAAAAASUVORK5CYII=';
const placeholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjmDlz5n8ABmUCy5DkU4QAAAAASUVORK5CYII=';

const useMobile = (val = 479) => {
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
    if (window !== undefined) {
      const checkWindowWidth = () => {
        const width = window.innerWidth;
        setIsMobile(width <= val);
      };
      checkWindowWidth();
      window.addEventListener('resize', checkWindowWidth);
      return () => {
        window.removeEventListener('resize', checkWindowWidth);
      };
    }
  }, []);
  return isMobile;
};

function extractCms(slug) {
  const cmsNames = slug.split('-vs-');
  return cmsNames.map((name) => {
    return name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  });
}

const useAOS = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);
};

const getImageSrc = (author) => {
  switch (author) {
    case 'Jaswinder Singh':
      return '/images/Jaswinder_Singh.svg';
    case 'Anupama Sharma':
      return '/images/anupama_sharma.svg';
    default:
      return '/images/Jaswinder_Singh.svg';
  }
};

const getAuthorInfo = (id, type, AuthorData) => {
  const author = AuthorData.find((author) => {
    return author?.id === id;
  });

  switch (type) {
    case 'name':
      return author?.name;
    case 'avatar':
      return author?.avatar;
    case 'message':
      return author?.message;
    case 'socialLinks':
      return author?.socialLinks;
    default:
      return '';
  }
};

const capitalizeFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const getAllBlogs = async () => {
  const limit = 100;
  let page = 1;
  let isFetching = true;
  let blogsCount = 0;
  let totalBlogs;

  let fullBlogs = {
    blogs: [],
  };
  // Fetch all blogs
  return fullBlogs;
};

const getShortCode = (sessionValue) => {
  switch (sessionValue) {
    case 'Australia':
      return 'AU';
    case 'USA':
      return 'US'; 
    case 'UAE':
      return 'AE';
    default:
      return 'GL';
  }
};
const RemoveSlash = (path) => {
  return path.replace('/', '');
};
const replaceDashWithSpace = (text) => {
  return text.replace(/-/g, ' ');
};



export {
  camelCaseToDashed,
  flatDeep,
  slugify,
  containsObject,
  getCategories,
  getTags,
  sortingByDate,
  formatDateString,
  isValidEmail,
  getButtonClassNames,
  reverseSlug,
  isProd,
  separateSearchParams,
  europeanCountries,
  placeholder,
  placeholderLight,
  useMobile,
  extractCms,
  useAOS,
  getImageSrc,
  getAuthorInfo,
  getAllBlogs,
  capitalizeFirstLetter,
  getShortCode,
  RemoveSlash,
  replaceDashWithSpace,
};
