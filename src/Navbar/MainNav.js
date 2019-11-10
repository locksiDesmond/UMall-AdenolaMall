import React from "react";
// import { Navbar, Form, Button } from "react-bootstrap/Navbar";
import logo from "../images/umall2.gif";
import NavForm from "./NavForm";
import LeftNav from "./LeftNav";
import Cart from "./../SmallComponent/Cart";
import Badge from "./../SmallComponent/badge";

function MainNav() {
  return (
    <nav className="Navbar">
      <a href="/" className="navbar-brand">
        <img className="navbar--logo" alt="" src={logo} />
      </a>

      <NavForm />
      <div className="navbar--contents" style={{ marginTop: "1.2rem" }}>
        <LeftNav />
        <div className="logo--div">
          <a href="/">
            <Cart /> <Badge />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
