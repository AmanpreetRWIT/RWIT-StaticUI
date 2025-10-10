const Tag = ({ blok, key }) => {
    return (
      <span
        className={`sub-title extra11-color`}
        key={`tag-${key}`}
        style={{
          color: blok?.TextColor?.color ? blok?.TextColor?.color : '#2690D4',
          border: '1px solid #2690D4',
          background: blok?.BGColor?.color ? blok?.BGColor?.color : '#D4E9F6',
        }}
      >
        {blok?.TagName}
      </span>
    );
  };
  
  export default Tag;
  