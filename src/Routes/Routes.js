import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import SignIn from "./../Components/SignIn/index";
import SignUp from "./../Components/SignUp/index";
import LandingPage from "./../Components/LandingPage/index";
import Footer from "./../Components/Footer/index";
const Routes = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/public" component={PublicRoutes} />
          <Route path="/home" component={ProtectedRoutes} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
};
export default Routes;
