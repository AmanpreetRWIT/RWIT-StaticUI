import React, { useState, useEffect, useRef } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const SearchComponent = ({ onSearch }) => {

  // Load all blog data from JSON file
  const allBlogs = require('../../public/allBlogData.json');

  const router = useRouter();
  const searchRef = useRef(null);
  const [query, setQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Effect to handle debouncing of the search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowResults(false);
      } else {
        setShowResults(true);
      }
    };

    document?.addEventListener('mousedown', handleClickOutside);
    return () => {
      document?.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setQuery('');
      setFilteredBlogs([]);
      setShowResults(false);
    };

    router?.events?.on('routeChangeStart', handleRouteChange);

    return () => {
      router?.events?.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  // Effect to fetch filtered blogs based on the debounced query
  useEffect(() => {
    const fetchFilteredBlogs = async () => {
      if (debouncedQuery?.length > 2) {
        setLoading(true);

        // Split the query into individual terms and limit to 3 words
        const queryTerms = debouncedQuery
          .toLowerCase()
          .split(' ')
          .filter((term) => term)
          .slice(0, 3);

        // Filter blogs based on multiple query terms
        const filtered = allBlogs.filter((blog) => {
          const blogName = blog?.name?.toLowerCase();
          const excerpt = blog?.content?.Excerpt?.toLowerCase();
          const content = blog?.content?.BlogContent?.some((content) =>
            content?.description?.content?.some((paragraph) =>
              paragraph?.content?.some((text) =>
                text?.text?.toLowerCase().includes(debouncedQuery.toLowerCase())
              )
            )
          );

          // Check for exact matches first
          const exactMatch = queryTerms.every(
            (term) => blogName.includes(term) || excerpt.includes(term)
          );

          // Check for partial matches
          const partialMatch = queryTerms.some(
            (term) =>
              blogName.includes(term) || excerpt.includes(term) || content
          );

          return exactMatch || partialMatch;
        });

        // Sort results by exact matches first
        const exactMatches = filtered.filter((blog) =>
          queryTerms.every((term) => blog?.name?.toLowerCase().includes(term))
        );

        const otherMatches = filtered.filter(
          (blog) => !exactMatches.includes(blog)
        );

        const combinedFiltered = [...exactMatches, ...otherMatches];
        setFilteredBlogs(combinedFiltered);
        setShowResults(true);
        setLoading(false);
        setShowNoResults(combinedFiltered.length === 0);
      } else {
        setFilteredBlogs([]);
        setShowNoResults(false);
      }
    };

    fetchFilteredBlogs();
  }, [debouncedQuery,allBlogs]);

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (query?.length > 3 && onSearch) {
      onSearch(query);
    }
  };

  // Clear the search input and results
  const handleClear = () => {
    setQuery('');
    setFilteredBlogs([]);
    setShowNoResults(false);
  };

  // Highlight keywords in the blog title
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  const highlightKeywords = (text, query) => {
    const queryTerms = query.split(' ').map(escapeRegExp);
    const regex = new RegExp(`(${queryTerms.join('|')})`, 'gi');
    return text.split(regex).map((part, index) =>
      queryTerms.some((term) => part.toLowerCase() === term.toLowerCase()) ? (
        <span key={index} style={{ backgroundColor: '#0D6EFD30' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container">
      <div ref={searchRef} className="blogSearch">
        <form
          onSubmit={handleSearch}
          className="blogSearch__input  rounded-none"
        >
          <div className="blogSearch__searchIcon">
            <Image
              src="/images/search-icon.svg"
              alt="Search icon"
              width={25}
              height={25}
              loading="lazy"
            />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="shadow-none"
          />
          {query && (
            <button
              type="button"
              className="blogSearch__btn"
              onClick={handleClear}
            >
              {loading ? (
                <div className="loading" />
              ) : (
                <Image
                  src="/images/cross-icon.svg"
                  alt="Cross icon"
                  className="blogresult__crossIcon"
                  width={22}
                  height={22}
                  loading="lazy"
                />
              )}
            </button>
          )}
        </form>
        {showResults &&
          (loading ? (
            <div className="text-center">
              <div className="loading" />
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="blogresult blogresult-border mt-1">
              <div className="blogresult-wrap">
                {filteredBlogs.map((blog, index) => (
                  <Link
                    id="blogresult__item"
                    href={`/${blog?.full_slug}`}
                    key={index}
                    className="mb-2 d-flex align-items-star list-group-item blogresult__item"
                  >
                    <Image
                      src={blog?.content?.FeaturedImage?.filename}
                      alt={blog?.name}
                      className="blogresult__img me-3"
                      width={200}
                      height={60}
                      loading="lazy"
                    />
                    <div className="blogresult__content">
                      <h5 className="blogresult__heading">
                        {highlightKeywords(blog?.name, query)}
                      </h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            showNoResults && (
              <div className="blogresult blogresult__noresult mt-1 text-center">
                <p>No results found. Please try a different query!</p>
              </div>
            )
          ))}
      </div>
    </div>
  );
};
