import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "./../../images/umall2.gif";
import NavForm from "./NavForm";
import LeftNav from "./LeftNav";
import Cart from "./../../SmallComponent/Cart";
import { ContextCreator } from "./../../Context/Context";
import { Link } from "react-router-dom";
class MainNav extends React.Component {
  static contextType = ContextCreator;
  render() {
    const { authenticated } = this.context;
    return (
      <Navbar className="Navbar">
        <Link to={{ pathname: "/" }} className="navbar-brand">
          <img className="navbar--logo" alt="" src={logo} />
        </Link>
        <NavForm />
        <div className="navbar--contents">
          <LeftNav authenticated={authenticated} />
          <div className="logo--div">
            <a href="/">
              <Cart />
            </a>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default MainNav;
