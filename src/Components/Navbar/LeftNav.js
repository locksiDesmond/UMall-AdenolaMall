import React, { useState } from "react";
import { Link } from "react-router-dom";
import Btn from "./../../SmallComponent/Btn";
import img from "../../images/svgs/user.svg";
import { FaPen } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
function LeftNav(props) {
  const [show, setShow] = useState(false);
  // const [signedIn, setSignedIn] = useState(false);

  // const authenticated = props.authenticated;
  // useEffect(() => {
  //   if (authenticated) {
  //     setSignedIn(true);
  //   } else {
  //     setSignedIn(false);
  //   }
  // }, [authenticated]);
  const showDropdown = () => {
    setShow(!show);
  };
  const iconStyle = { fontSize: ".7rem", marginRight: ".4rem" };
  const profile = (
    <div
      style={{ marginLeft: ".5rem" }}
      className={`profile--dropdown ${show && "show"} `}
    >
      <button className="a">
        <img
          id="dropdown basic"
          src={img}
          alt="Dp"
          onClick={showDropdown}
          className="rounded-circle card--profile--photo"
        />
      </button>
      <div className="dropdown--menu">
        <button className="a" onClick={showDropdown}>
          {props.user.displayName}
        </button>
        <hr />
        <button onClick={showDropdown} className="a">
          Setting
        </button>
        <Link to={{ pathname: "/Profile" }}>
          <button onClick={showDropdown} className="a">
            <FaPen style={iconStyle} />
            Profile
          </button>
        </Link>
        <button className="a signin--modal--button" onClick={props.showLogOut}>
          <FiLogOut style={iconStyle} />
          Log out
        </button>
      </div>
    </div>
  );
  const user = (
    <React.Fragment>
      <span>
        <Link to={{ pathname: "/home/upload" }}>
          <Btn title="post" color="#f4754e" />
        </Link>

        {profile}
      </span>
    </React.Fragment>
  );
  const anonymous = (
    <span>
      <Link to={{ pathname: "/signin" }}>
        <Btn className="dontshow" title="signin" color="#f4754e" />
      </Link>
      <Btn
        onClick={props.handleShow}
        className="signin--modal--button a"
        title="Sign in"
        color="#f4754e"
      />

      <button
        style={{ marginLeft: ".4rem" }}
        onClick={props.showSignUp}
        className="signin--modal--button a"
      >
        SignUp
      </button>
    </span>
  );
  return (
    <div className="left--nav">{props.authenticated ? user : anonymous}</div>
  );
}

export default LeftNav;
