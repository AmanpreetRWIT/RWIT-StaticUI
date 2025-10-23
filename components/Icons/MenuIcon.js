import React from 'react';

const MenuIcon = (color) => {
  return (
    <>
      <svg
        width="12"
        height="7"
        viewBox="0 0 12 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill=""
          d="M10.1667 1.83333L6.00004 6L1.83337 1.83333"
          stroke={color?.color ? color?.color :"#000248"}
        />
      </svg>
    </>
  );
};

export default MenuIcon;
