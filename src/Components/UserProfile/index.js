import React, { useState } from "react";
import image from "../../images/blackwoman.jfif";
import ProfileNav from "./ProfileNav";
const UserProfile = () => {
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
    <div className="main--content main">
      <div className="image--div" style={{ backgroundImage: `url(${image})` }}>
        <img className="" alt="D P" />
      </div>
      <div className="">some stuff</div>
      <h2>UserProfile</h2>
      <ProfileNav onClick={handleSelect} display={display} />
      {display === "link-1"
        ? settings
        : display === "link-1"
        ? Profile
        : upload}
    </div>
  );
};

export default UserProfile;
