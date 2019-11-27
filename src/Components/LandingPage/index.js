import React, { useState } from "react";
import MainNav from "../Navbar/MainNav";
import SideNav from "../SideNav/SideNav";
import LandingPageBody from "./LandingPageBody";
import Loading from "../../SmallComponent/Loading";
const LandingPage = props => {
  const [sidenav, setSidenav] = useState(false);
  const location = props.location;
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
          <div className="body--content">
            <SideNav onClick={ToggleNav} disabled={sidenav} />
            <LandingPageBody
              location={location}
              user={props.user}
              firebase={props.firebase}
              authenticated={props.authenticated}
            />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default LandingPage;
