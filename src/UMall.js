import React from "react";
import "./css/umall.css";
import MainNav from "./Navbar/MainNav";
import SideNav from "./SideNav/SideNav";
import MainBody from "./Main/MainBody";

function UMall() {
  return (
    <div className="app">
      <MainNav />
      <div className="body">
        <SideNav />
        <MainBody />
      </div>
    </div>
  );
}

export default UMall;
