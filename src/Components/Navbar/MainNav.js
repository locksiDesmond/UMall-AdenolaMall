import React from "react";
import Navbar from "react-bootstrap/Navbar";
import logo from "./../../images/umall2.gif";
import NavForm from "./NavForm";
import LeftNav from "./LeftNav";
import { ContextCreator } from "./../../Context/Context";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal";
import LogOutModal from "./LogOutModal";
import SignInModal from "./SignInModal";
import { GiHamburgerMenu } from "react-icons/gi";
class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      logout: false,
      signup: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.showLogOut = this.showLogOut.bind(this);
    this.closeLogOut = this.closeLogOut.bind(this);
    this.showSignUp = this.showSignUp.bind(this);
    this.closeSignUp = this.closeSignUp.bind(this);
  }
  static contextType = ContextCreator;
  showSignUp() {
    this.setState({
      signup: true
    });
  }
  closeSignUp() {
    this.setState({
      signup: false
    });
  }
  handleClose() {
    this.setState({
      show: false
    });
  }
  showLogOut() {
    this.setState({
      logout: true
    });
  }
  closeLogOut() {
    this.setState({
      logout: false
    });
  }
  handleShow() {
    this.setState({
      show: true
    });
  }
  render() {
    const { authenticated, user, firebase } = this.context;
    return (
      <Navbar className="Navbar">
        <Link to={{ pathname: "/" }} className="navbar-brand">
          <img className="navbar--logo" alt="" src={logo} />
        </Link>
        <NavForm />
        <div className="navbar--contents">
          <LeftNav
            handleShow={this.handleShow}
            showLogOut={this.showLogOut}
            authenticated={authenticated}
            user={user}
            showSignUp={this.showSignUp}
          />
          <LogOutModal
            firebase={firebase}
            user={user}
            show={this.state.logout}
            handleClose={this.closeLogOut}
          />
          <SignUpModal
            show={this.state.signup}
            firebase={firebase}
            handleClose={this.closeSignUp}
          />
          <SignInModal
            show={this.state.show}
            firebase={firebase}
            handleClose={this.handleClose}
          />
        </div>
        <button onClick={this.props.handleclick} className="btn hamburger">
          <GiHamburgerMenu style={{ color: "#fff", fontSize: "2rem" }} />
        </button>
      </Navbar>
    );
  }
}

export default MainNav;
