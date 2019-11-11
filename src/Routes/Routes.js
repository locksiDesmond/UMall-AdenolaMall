import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import MainNav from "./../Components/Navbar/MainNav";
const Routes = () => {
  return (
    <React.Fragment>
      <Router>
        <MainNav />
        <Switch>
          <Route path="/public" component={PublicRoutes} />
          <Route path="/protected" component={ProtectedRoutes} />
        </Switch>
      </Router>
    </React.Fragment>
  );
};
export default Routes;
