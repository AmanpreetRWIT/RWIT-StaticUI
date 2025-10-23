const WhiteSpace = ({ blok }) => (
  <div
    style={{
      height: `${blok?.Height}px`,
      backgroundColor: blok?.BGColor?.color || '#FFFFFF',
    }}
  ></div>
);

export default WhiteSpace;
