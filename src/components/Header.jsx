import React from "react";
import "./Header.scss";

const Header = ({children}) => {
  return (
    <div className="headerdiv d-flex justify-content-between align-items-center">
      <p className="m-0 p-3 text-center fs-18">APY Canvas Merchants</p>
      {children}
    </div>
  );
};

export default Header;
