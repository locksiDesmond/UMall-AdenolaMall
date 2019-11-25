import React from "react";
import UpLoadForm from "./UpLoadForm";
import { Redirect } from "react-router-dom";
import { Userdata } from "../DropdownPages/FetchData";
const UserInfo = props => {
  return (
    <div>
      <p>Your Details</p>
      <p>Name : {props.data.username || props.user.displayName}</p>
      <p>Phone Number : {props.data.phoneNumber || "no Number"}</p>
    </div>
  );
};
const Upload = ({ user, authenticated }) => {
  let userdata = Userdata(user.uid);
  return (
    <div className="main--content">
      {authenticated ? (
        <React.Fragment>
          <UserInfo user={user} data={userdata} />
          <UpLoadForm user={user} />
        </React.Fragment>
      ) : (
        <Redirect to={{ pathname: "/signin" }} />
      )}
    </div>
  );
};

export default Upload;
