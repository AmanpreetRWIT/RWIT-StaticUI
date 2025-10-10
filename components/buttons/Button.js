import Link from 'next/link';
import Image from 'next/image';
import { getButtonClassNames } from '../../helpers/utilities';

const Button = ({ data, index }) => {
  const href = data?.link || '/';
  const target = data?.target || '';
  const label = data?.label || '';
  const buttonColor = data?.buttonColor || '';
  const buttonSize = data?.buttonSize || '';
  const hideArrow = data?.hideArrow || false;
  const buttonLogo = data?.buttonLogo || null;
  const hideButtonLogo = data?.hideButtonLogo || false;
  const extraClass = data?.className || '';
console.log('data', data)
  return (
    <Link href={href} key={'button' + index} legacyBehavior>
      <a
        className={`${getButtonClassNames(data)} ${extraClass} ${buttonColor} ${
          buttonColor !== 'btn-transparent' && buttonColor !== 'axil-link-button'
            ? 'btn-solid'
            : ''
        } ${buttonSize}`}
        target={target}
      >
        <span className={`button-text hoverable ${hideArrow && (!buttonLogo || hideButtonLogo) ? 'px-0' : ''}`}>
          {label}
        </span>

        {buttonLogo && !hideButtonLogo && (
          <div className="button-logo-wrap">
            <Image
              src={buttonLogo.filename}
              width={24}
              height={24}
              alt={buttonLogo.alt || 'Button Logo'}
              className="button-logo"
            />
          </div>
        )}

        {(!buttonLogo || hideButtonLogo) && !hideArrow && (
          <span className="fas fa-external-link-alt"></span>
        )}
      </a>
    </Link>
  );
};

export default Button;
