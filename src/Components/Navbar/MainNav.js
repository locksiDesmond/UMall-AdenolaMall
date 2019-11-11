import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "./../../images/umall2.gif";
import NavForm from "./NavForm";
import LeftNav from "./LeftNav";
import Cart from "./../../SmallComponent/Cart";
function MainNav() {
  return (
    <Navbar className="Navbar">
      <a href="/" className="navbar-brand">
        <img className="navbar--logo" alt="" src={logo} />
      </a>
      <NavForm />
      <div className="navbar--contents">
        <LeftNav />
        <div className="logo--div">
          <a href="/">
            <Cart />
          </a>
        </div>
      </div>
    </Navbar>
  );
}

export default MainNav;
