import React, { useState } from "react";
import firebase from "./../../Firebase/Firebase";
function LeftNav() {
  const [signedIn] = useState(false);
  const style = !signedIn ? { display: "none" } : {};
  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .catch(error => {
        console.log("error");
      });
  };
  return (
    <div className="left--nav">
      <p style={style}>Sign in</p>
      <p onClick={Logout}>Log Out</p>
    </div>
  );
}

export default LeftNav;
