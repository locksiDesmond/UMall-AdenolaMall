import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../Navbar/MainNav";
import SideNav from "../SideNav/SideNav";
// import LandingPageBody from "./LandingPageBody";
import Loading from "../../SmallComponent/Loading";
import Upload from "../Upload";
const LandingPage = props => {
  return (
    <div>
      {!props.loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <MainNav />
          <Link to="signin">SignIn</Link>
          <Link to="signup">signup</Link>
          <div className="body--content">
            <SideNav />
            <Upload />
            {/* <LandingPageBody /> */}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default LandingPage;
