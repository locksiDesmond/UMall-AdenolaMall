import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import SignIn from "./../Components/SignIn/index";
import SignUp from "./../Components/SignUp/index";
import LandingPage from "./../Components/LandingPage/index";
import ErrorPage from "./../SmallComponent/ErrorPage";
import UserProfile from "./../Components/UserProfile/index";
import Footer from "./../Components/Footer/index";
import Description from "./../Components/Description/index";
import ForgotPassword from "./../Components/ForgotPassword/index";
const Routes = props => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route
            path="/signIn"
            component={() => <SignIn firebase={props.firebase} />}
          />
          <Route
            path="/signUp"
            component={() => <SignUp firebase={props.firebase} />}
          />
          <Route path="/umall" component={ProtectedRoutes} />
          <Route path="/description" component={Description} />
          <Route
            path="/reset"
            component={() => <ForgotPassword firebase={props.firebase} />}
          />
          <Route
            path="/Profile"
            component={() => (
              <UserProfile authenticated={props.authenticated} />
            )}
          />
          <Route
            exact
            path="/"
            component={({ location }) => (
              <LandingPage
                user={props.user}
                location={location.state}
                firebase={props.firebase}
                authenticated={props.authenticated}
                loading={props.loading}
              />
            )}
          />
          <Route path="*" component={ErrorPage} />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  );
};
export default Routes;
