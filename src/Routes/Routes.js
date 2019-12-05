import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorPage from "./../SmallComponent/ErrorPage";
import Footer from "./../Components/Footer/index";
import ContactUs from "./../Components/ContactUs/index";
import TermsAndConditions from "./../Components/TermsAndConditions/index";
import ForgotPassword from "./../Components/ForgotPassword/index";
import Loading from "../SmallComponent/Loading";
const ProtectedRoutes = Loadable({
  loader: () => import("./ProtectedRoutes"),
  loading: Loading
});
const UserProfile = Loadable({
  loader: () => import("./../Components/UserProfile/index"),
  loading: Loading
});
const SignIn = Loadable({
  loader: () => import("./../Components/SignIn/index"),
  loading: Loading
});
const SignUp = Loadable({
  loader: () => import("./../Components/SignUp/index"),
  loading: Loading
});
const LandingPage = Loadable({
  loader: () => import("./../Components/LandingPage/index"),
  loading: Loading
});
const Description = Loadable({
  loader: () => import("./../Components/Description/index"),
  loading: Loading
});
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
          <Route path="/TermsAndConditions" component={TermsAndConditions} />
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
          <Route path="/contactus" component={ContactUs} />
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
