import React, { useState } from "react";
import { Link } from "react-router-dom";
import MainNav from "../Navbar/MainNav";
import SideNav from "../SideNav/SideNav";
import LandingPageBody from "./LandingPageBody";
import Loading from "../../SmallComponent/Loading";
const LandingPage = props => {
  const [sidenav, setSidenav] = useState(false);
  const ToggleNav = () => {
    setSidenav(!sidenav);
  };
  return (
    <React.Fragment>
      {!props.loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <MainNav onClick={ToggleNav} />
          <Link to="signin">SignIn</Link>
          <Link to="signup">signup</Link>
          <div className="body--content">
            <SideNav onClick={ToggleNav} disabled={sidenav} />
            <LandingPageBody authenticated={props.authenticated} />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default LandingPage;
