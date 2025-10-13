import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

export const ContentBlock = ({ blok }) => {
  return (
    <div
      className="privacy-policy-area ax-section-gap"
      style={blok?.BgColor?.color ? { background: blok?.BgColor?.color } : {}}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div
              className={`content ${
                blok?.TitleColor?.color ? 'custom-color' : ''
              }`}
              style={
                blok?.TitleColor?.color ? { color: blok?.TitleColor?.color } : {}
              }
            >
              <div className="inner">
                {blok?.content && (
                  <div className={`${blok?.TextAlign} content_list`}>
                    {render(blok?.content)}
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
export default ContentBlock;
