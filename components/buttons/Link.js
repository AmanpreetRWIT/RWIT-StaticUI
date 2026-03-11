import Link from 'next/link';

const SimpleLink = ({ blok, Index }) => {
  return (
    <Link
      href={blok?.Link?.url || ""}
      key={'simple-link-' + Index}
      target={blok?.Link?.target}
      legacyBehavior
    >
      <a>
        <span className={`button-text`}>{blok?.Label}</span>

        {!blok?.HideArrow && <span className='button-icon'></span>}
      </a>
    </Link>
  );
};

export default SimpleLink;
