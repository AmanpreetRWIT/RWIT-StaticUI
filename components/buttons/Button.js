import Link from 'next/link';
import { getButtonClassNames } from '../../helpers/utilities';
import Image from 'next/image';

const Button = ({ button, index }) => {
  const hideArrow =
    button?.HideArrow ?? button?.hideArrow ?? button?.hidearrow ?? button?.hide_arrow;

  const rawHref =
    button?.Link?.story?.url ?? button?.Link?.cached_url ?? button?.Link?.url;

  const href =
    typeof rawHref === 'string' && rawHref.length > 0
      ? rawHref.startsWith('http://') || rawHref.startsWith('https://')
        ? rawHref
        : rawHref.startsWith('/')
          ? rawHref
          : '/' + rawHref
      : '/';

  return (
    <Link
      href={href}
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
            hideArrow &&
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
          !hideArrow && (
            <span className="fas fa-external-link-alt"></span>
          )}
      </a>
    </Link>
  );
};

export default Button;
