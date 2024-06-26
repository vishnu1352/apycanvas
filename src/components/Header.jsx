import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

const Header = ({children}) => {
  const navigate = useNavigate();

  return (
    <div className="headerdiv d-flex justify-content-between align-items-center position-sticky fixed-top">
      <p className="m-0 p-3 text-center fs-18" onDoubleClick={()=>navigate("/addinventory")}>Customized Keychains</p>
      {children}
    </div>
  );
};

export default Header;
