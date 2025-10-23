import {
  ReactCompareSlider,
  ReactCompareSliderImage,
  ReactCompareSliderHandle,
} from 'react-compare-slider';
import { getImageDimension } from '../../helpers/utilities';
import { useMobile } from '../../helpers/utilities';

const ComparisonSlider = ({
  Tag,
  TagColor,
  Heading,
  HeadingColor,
  Description,
  DescriptionColor,
  changeOnHover = false,
  SliderPosition = 3,
  BeforeImage,
  AfterImage,
  SubTitle,
  SubTitleColor,
}) => {
  const isMobile = useMobile();

  return (
    <div
      id="comparisonImage"
      className="divider-container ax-section-gap comparisonSlider"
    >
      <div className="container">
        {Tag && (
          <div
            className="comparisonSlider__Tag"
            style={{
              color: TagColor?.color,
            }}
          >
            <span>{Tag}</span>
          </div>
        )}

        <div className="content text-center">
          {Heading && (
            <h2
              className="axil-display-1 layer1 custom-h1"
              style={HeadingColor?.color ? { color: HeadingColor.color } : {}}
            >
              {Heading}
            </h2>
          )}

          {Description && (
            <div
              className="layer2 subtitle custom-color"
              style={
                DescriptionColor?.color
                  ? { color: DescriptionColor.color }
                  : {}
              }
            >
              {Description}
            </div>
          )}
        </div>

        <ReactCompareSlider
          id="imageComparisonSlider"
          onlyHandleDraggable={false}
          changePositionOnHover={changeOnHover}
          position={Number(SliderPosition || 3)}
          handle={
            <ReactCompareSliderHandle
              style={{
                color: '#1b90dc',
              }}
              buttonStyle={
                !isMobile
                  ? {
                      backgroundColor: '#d6eaff',
                      boxShadow: 'unset',
                      border: 'unset',
                      position: 'relative',
                      gap: '36px',
                      borderRadius: '50px',
                      padding: '9px',
                      width: '56px',
                      height: '56px',
                    }
                  : {
                      backgroundColor: '#d6eaff',
                      boxShadow: 'unset',
                      border: 'unset',
                      position: 'relative',
                      gap: '5px',
                      borderRadius: '50px',
                      padding: '4px',
                      width: '36px',
                      height: '36px',
                    }
              }
              linesStyle={
                !isMobile
                  ? {
                      width: '10px',
                      backgroundColor: '#d6eaff',
                      pointerEvents: 'unset',
                      boxShadow: 'unset',
                    }
                  : {
                      width: '7px',
                      backgroundColor: '#d6eaff',
                      pointerEvents: 'unset',
                      boxShadow: 'unset',
                    }
              }
            />
          }
          itemOne={
            <ReactCompareSliderImage
              src={BeforeImage?.filename}
              alt="Before Image"
              width={getImageDimension(BeforeImage?.filename, 1000, 650)?.width}
              height={
                getImageDimension(BeforeImage?.filename, 1000, 650)?.height
              }
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={AfterImage?.filename}
              alt="After Image"
              width={getImageDimension(AfterImage?.filename, 1000, 650)?.width}
              height={getImageDimension(AfterImage?.filename, 1000, 650)?.height}
            />
          }
        />

        {SubTitle && (
          <p
            style={SubTitleColor?.color ? { color: SubTitleColor.color } : {}}
            className="comparisonSlider__subtitle"
          >
            {SubTitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default ComparisonSlider;
