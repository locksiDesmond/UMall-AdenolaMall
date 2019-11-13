import React from "react";
import MainNav from "./../Components/Navbar/MainNav";
import { Route, Switch, Link } from "react-router-dom";
import UserProfile from "./../Components/UserProfile/index";
import Home from "./../Components/Home/MainBody";
import { Redirect } from "react-router-dom";
import { ContextCreator } from "./../Context/Context";
import Upload from "./../Components/Upload/index";
class ProtectedRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  static contextType = ContextCreator;
  render() {
    const { authenticated } = this.context;
    const RenderItem = (
      <div>
        <MainNav />
        <Link to={{ pathname: "/Home" }}>Home </Link>
        <Link to="/Profile">Profile</Link>
        <Link to="/upload">Upload Dp</Link>

        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route path="/Profile" component={UserProfile} />
          <Route path="/upload" component={Upload} />
        </Switch>
      </div>
    );
    return (
      <React.Fragment>
        {authenticated ? RenderItem : <Redirect to={{ pathname: "/signin" }} />}
      </React.Fragment>
    );
  }
}
export default ProtectedRoutes;
