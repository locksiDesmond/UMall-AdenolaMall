import React from "react";
import "./css/umall.css";
import MainNav from "./Components/Navbar/MainNav";
import SideNav from "./Components/SideNav/SideNav";
import MainBody from "./Components/Main/MainBody";

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
