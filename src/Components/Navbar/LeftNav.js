import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Btn from "./../../SmallComponent/Btn";
function LeftNav(props) {
  const [signedIn, setSignedIn] = useState(false);

  const authenticated = props.authenticated;
  useEffect(() => {
    if (authenticated) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [authenticated]);
  const signedInPost = (
    <React.Fragment>
      <span>
        <Link to={{ pathname: "/home/upload" }}>
          <Btn title="post" color="#f4754e" />
        </Link>
        <button
          style={{ marginLeft: ".5rem", fontSize: "1rem" }}
          className="a signin--modal--button"
          onClick={props.showLogOut}
        >
          Log-out
        </button>
      </span>
    </React.Fragment>
  );
  const signin = (
    <span>
      <Link to={{ pathname: "/signin" }}>
        <Btn className="dontshow" title="signin" color="#f4754e" />
      </Link>
      <button onClick={props.handleShow} className="signin--modal--button a">
        Signin
      </button>
      <button onClick={props.showSignUp} className="signin--modal--button a">
        SignUp
      </button>
    </span>
  );
  return <div className="left--nav">{signedIn ? signedInPost : signin}</div>;
}

export default LeftNav;
