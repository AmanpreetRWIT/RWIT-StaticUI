import Link from 'next/link';
import { getButtonClassNames } from '../../helpers/utilities';
import Image from 'next/image';


const Button = ({ blok, Index}) => {

  return (
    <Link
       href={
        blok?.Link?.story?.url !== undefined
          ? '/' + blok?.Link?.story?.url
          : blok?.Link?.url || '/'
      }
      key={'button' + Index}
      legacyBehavior
    >
      <a
        className={`${getButtonClassNames(blok)} ${
          blok?.Class ? blok?.Class : ''
        } ${blok?.ButtonColor ? blok?.ButtonColor : ''} 
        ${
          blok?.ButtonColor != 'btn-transparent' &&
          blok?.ButtonColor != 'axil-link-button'
            ? 'btn-solid'
            : ''
        } 
        ${blok?.ButtonSize ? blok?.ButtonSize : ''}  `}
        target={blok?.Link?.target || ''}
      >
        <span
          className={`button-text hoverable ${
            blok?.HideArrow &&
            (!blok?.ButtonLogo?.filename || blok?.HideButtonLogo)
              ? 'px-0'
              : ''
          }`}
        >
          {blok?.Label}
        </span>

        {blok?.ButtonLogo?.filename && !blok?.HideButtonLogo && (
          <div className="button-logo-wrap">
            <Image
              src={blok?.ButtonLogo?.filename}
              width={24}
              height={24}
              alt={blok?.ButtonLogo?.alt || 'Button Logo'}
              className="button-logo"
            />
          </div>
        )}
        {(!blok?.ButtonLogo?.filename || blok?.HideButtonLogo) &&
          !blok?.HideArrow && (
            <span className="fas fa-external-link-alt"></span>
          )}
      </a>
    </Link>
  );
};

export default Button;
