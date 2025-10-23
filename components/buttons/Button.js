import Link from 'next/link';
import { getButtonClassNames } from '../../helpers/utilities';
import Image from 'next/image';

const Button = ({ button, index }) => {
  return (
    <Link
      href={
        button?.Link?.story?.url !== undefined
          ? '/' + button?.Link?.story?.url
          : button?.Link?.url || '/'
      }
      key={'button' + index}
      legacyBehavior
    >
      <a
        className={`${getButtonClassNames(button)} 
          ${button?.Class || ''} 
          ${button?.ButtonColor || ''} 
          ${
            button?.ButtonColor !== 'btn-transparent' &&
            button?.ButtonColor !== 'axil-link-button'
              ? 'btn-solid'
              : ''
          } 
          ${button?.ButtonSize || ''}`}
        target={button?.Link?.target || ''}
      >
        <span
          className={`button-text hoverable ${
            button?.HideArrow &&
            (!button?.ButtonLogo?.filename || button?.HideButtonLogo)
              ? 'px-0'
              : ''
          }`}
        >
          {button?.Label}
        </span>

        {button?.ButtonLogo?.filename && !button?.HideButtonLogo && (
          <div className="button-logo-wrap">
            <Image
              src={button?.ButtonLogo?.filename}
              width={24}
              height={24}
              alt={button?.ButtonLogo?.alt || 'Button Logo'}
              className="button-logo"
            />
          </div>
        )}

        {(!button?.ButtonLogo?.filename || button?.HideButtonLogo) &&
          !button?.HideArrow && (
            <span className="fas fa-external-link-alt"></span>
          )}
      </a>
    </Link>
  );
};

export default Button;
