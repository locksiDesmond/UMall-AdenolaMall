import React, { useState } from "react";
import { Link } from "react-router-dom";
import Btn from "./../../SmallComponent/Btn";
import img from "../../images/svgs/user.svg";
import { FaPen } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Userdata } from "../DropdownPages/FetchData";
function LeftNav(props) {
  const [show, setShow] = useState(false);

  const userdata = props.authenticated && Userdata(props.user.uid);
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
          src={userdata.photoUrl}
          alt="dp"
          onClick={showDropdown}
          className="rounded-circle card--profile--photo"
        />
      </button>
      <div className="dropdown--menu">
        <button
          style={{ color: "#474a60" }}
          className="a a-none"
          onClick={showDropdown}
        >
          {props.user.displayName}
        </button>
        <hr />
        <Link to={{ pathname: "/umall/Post" }}>
          <button
            style={{ marginLeft: "1rem" }}
            onClick={showDropdown}
            className="display--none a"
          >
            Post
          </button>
        </Link>

        <Link to={{ pathname: "/Profile" }}>
          <button onClick={showDropdown} className="a">
            <FaPen style={iconStyle} />
            Profile
          </button>
        </Link>
        <button
          style={{ display: "block" }}
          className="a signin--modal--button"
          onClick={props.showLogOut}
        >
          <FiLogOut style={iconStyle} />
          Log out
        </button>
      </div>
    </div>
  );
  const user = (
    <React.Fragment>
      <span>
        <Link className="display--block" to={{ pathname: "/umall/Post" }}>
          <Btn title="post" color="#f4754e" />
        </Link>

        {profile}
      </span>
    </React.Fragment>
  );
  const anonymous = (
    <span>
      <Link to={{ pathname: "/signin" }}>
        <Btn className="dontshow" title="Log in" color="#f4754e" />
      </Link>
      <Btn
        onClick={props.handleShow}
        className="signin--modal--button a"
        title="Log in"
        color="#f4754e"
      />

      <button
        style={{ marginLeft: ".4rem" }}
        onClick={props.showSignUp}
        className="signin--modal--button a"
      >
        Sign Up
      </button>
    </span>
  );
  return (
    <div className="left--nav">{props.authenticated ? user : anonymous}</div>
  );
}

export default LeftNav;
