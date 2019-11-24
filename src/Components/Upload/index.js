import React from "react";
import UpLoadForm from "./UpLoadForm";
import {Redirect} from "react-router-dom";

const Upload = ({ authenticated }) => {
  return (
    <div className="main--content">
      {authenticated ? (
        <UpLoadForm />
      ) : (
        <Redirect to={{ pathname: "/signin" }} />
      )}
    </div>
  );
};

export default Upload;
