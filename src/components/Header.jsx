import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

const Header = ({ children }) => {
  

  return (
    <div className="headerdiv d-flex justify-content-between align-items-center position-sticky fixed-top">
      {children}
    </div>
  );
};

export default Header;
