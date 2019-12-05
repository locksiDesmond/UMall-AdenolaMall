import React, { useState, useEffect } from "react";
import ProfileNav from "./ProfileNav";
import Profile from "./Profile";

import MainNav from "./../Navbar/MainNav";
import { Redirect } from "react-router-dom";
import { ContextCreator } from "../../Context/Context";
import umall from "../../images/svgs/umall-1.svg";

import UpdateProfile from "./UpdateProfile";
import SideNav from "./../SideNav/SideNav";
import RecentUploads from "./RecentUploads";
const UserProfile = ({ authenticated }) => {
  const [display, setDisplay] = useState("Recent");
  const [sidebar, setSidebar] = useState(false);
  const handleSelect = selectedkey => {
    setDisplay(selectedkey);
  };
  useEffect(() => {
    if (sidebar) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
  }, [sidebar]);
  return (
    <React.Fragment>
      <MainNav handleclick={() => setSidebar(!sidebar)} />
      <div className={` ${sidebar ? "user--profile" : "displa--none"}`}>
        <SideNav handleclick={() => setSidebar(!sidebar)} disabled={sidebar} />
        {!authenticated && <Redirect to="/signin" />}
        <div style={{ fontSize: "1rem" }} className="profile--body">
          <div className="profile--main">
            <ProfileNav onClick={handleSelect} display={display} />
            {display === "Recent" ? (
              <ContextCreator.Consumer>
                {({ user }) => <RecentUploads user={user} />}
              </ContextCreator.Consumer>
            ) : (
              <ContextCreator.Consumer>
                {({ user, firebase }) => (
                  <UpdateProfile firebase={firebase} user={user} />
                )}
              </ContextCreator.Consumer>
            )}
          </div>
          <div className="profile--aside">
            <div className="profile">
              <ContextCreator.Consumer>
                {({ user, firebase }) => (
                  <Profile firebase={firebase} user={user} />
                )}
              </ContextCreator.Consumer>
            </div>
            <div className="footer">
              <ul>
                <li>&copy; Locksi 2019</li>
                <li>Contact </li>
                <li>Terms and condition</li>
                <li>Warnings</li>
              </ul>
              <div>
                <img style={{ height: "2.5rem" }} alt="logo" src={umall} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
