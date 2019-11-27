import React, { useState } from "react";
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
  const [display, setDisplay] = useState("Profile");
  const [sidebar, setSidebar] = useState(false);
  const handleSelect = selectedkey => {
    setDisplay(selectedkey);
  };

  return (
    <React.Fragment>
      <MainNav onClick={() => setSidebar(!sidebar)} />
      <div className={` ${sidebar ? "user--profile" : "displa--none"}`}>
        <SideNav onClick={() => setSidebar(!sidebar)} disabled={sidebar} />
        {!authenticated && <Redirect to="/signin" />}
        <div style={{ fontSize: "1rem" }} className="profile--body">
          <div className="profile--main">
            <ProfileNav onClick={handleSelect} display={display} />
            {display === "Recent" ? (
              <ContextCreator.Consumer>
                {({ user }) => <RecentUploads user={user} />}
              </ContextCreator.Consumer>
            ) : display === "Edit" ? (
              <h1>Edit</h1>
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
                <li>Term and condition</li>
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
