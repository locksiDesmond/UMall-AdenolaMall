import React, { useState, useEffect } from "react";
import { firebase } from "./../../Firebase/Firebase";
import { Link } from "react-router-dom";
import Btn from "./../../SmallComponent/Btn";
function LeftNav(props) {
  const [signedIn, setSignedIn] = useState(false);
  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .catch(error => {
        console.log("error");
      });
  };
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
        <button className="a">Post</button>
      </span>
      <span onClick={Logout}>
        <a href="/">Log Out</a>
      </span>
    </React.Fragment>
  );
  const signin = (
    <span>
      <Link to={{ pathname: "/signin" }}>
        <Btn title="signin" color="#f4754e" />
      </Link>
    </span>
  );
  return <div className="left--nav">{signedIn ? signedInPost : signin}</div>;
}

export default LeftNav;
