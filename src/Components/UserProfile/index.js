import React, { useState } from "react";
import ProfileNav from "./ProfileNav";
import MainNav from "./../Navbar/MainNav";
const UserProfile = ({ authenticated }) => {
  const [display, setDisplay] = useState("link-1");
  const handleSelect = selectedkey => {
    setDisplay(selectedkey);
  };
  const settings = (
    <div>
      <h1>Settings</h1>
    </div>
  );
  const Profile = (
    <div>
      <h1>Profile</h1>
    </div>
  );
  const upload = (
    <div>
      <h1>upload</h1>
    </div>
  );
  return (
    <React.Fragment>
      <MainNav />
      <div className="profile--body">
        <div className="profile--main">
          <ProfileNav onClick={handleSelect} display={display} />
          {display === "link-1"
            ? settings
            : display === "link-2"
            ? Profile
            : upload}
        </div>
        <div className="profile--aside">
          <h1>Profile side</h1>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
