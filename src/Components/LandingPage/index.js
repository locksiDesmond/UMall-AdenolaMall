import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../Navbar/MainNav";
import SideNav from "../SideNav/SideNav";
import LandingPageBody from "./LandingPageBody";
import Loading from "../../SmallComponent/Loading";
const LandingPage = props => {
  return (
    <React.Fragment>
      {!props.loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <MainNav />
          <Link to="signin">SignIn</Link>
          <Link to="signup">signup</Link>
          <div className="body--content">
            <SideNav />
            <LandingPageBody />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default LandingPage;
