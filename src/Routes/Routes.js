import React from "react";
import loadable from "@loadable/component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TextDescription from "./../Components/Description/TextDescription";
const ProtectedRoutes = loadable(() => import("./ProtectedRoutes"));
const ErrorPage = loadable(() => import("./../SmallComponent/ErrorPage"));
const Footer = loadable(() => import("./../Components/Footer/index"));
const ContactUs = loadable(() => import("./../Components/ContactUs/index"));
const TermsAndConditions = loadable(() =>
  import("./../Components/TermsAndConditions/index")
);

const ForgotPassword = loadable(() => import("./../Components/ForgotPassword"));
const UserProfile = loadable(() => import("./../Components/UserProfile/index"));
const SignIn = loadable(() => import("./../Components/SignIn/index"));
const SignUp = loadable(() => import("./../Components/SignUp/index"));
const LandingPage = loadable(() => import("./../Components/LandingPage/index"));
const Description = loadable(() => import("./../Components/Description/index"));
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
          <Route path="/description" component={TextDescription} />
          )} />
          <Route path="/vendorsdescription" component={Description} />
          <Route
            path="/mylink"
            component={() => <Description state="Vendors" />}
          />
          <Route
            path="/reset"
            component={() => <ForgotPassword firebase={props.firebase} />}
          />
          <Route
            path="/Profile"
            component={({ location }) => (
              <UserProfile
                location={location}
                authenticated={props.authenticated}
              />
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
