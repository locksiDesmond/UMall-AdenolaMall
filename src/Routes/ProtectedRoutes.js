import React from "react";
import MainNav from "./../Components/Navbar/MainNav";
import { Route, Switch, Link } from "react-router-dom";
import UserProfile from "./../Components/UserProfile/index";
import Home from "./../Components/Home/MainBody";
import { Redirect } from "react-router-dom";
import { ContextCreator } from "./../Context/Context";
import Upload from "./../Components/Upload/index";
import Loading from "../SmallComponent/Loading";
import SideNav from "../Components/SideNav/SideNav";
import ErrorPage from "./../SmallComponent/ErrorPage";
class ProtectedRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  static contextType = ContextCreator;
  render() {
    const { authenticated, loading } = this.context;
    const RenderItem = (
      <React.Fragment>
        <MainNav />
        <Link to={{ pathname: "/home/" }}>Home </Link>
        <Link to={{ pathname: "/home/Profile" }}>Profile</Link>
        <Link to={{ pathname: "/home/upload" }}>Upload Dp</Link>
        <div className="body--content">
          <SideNav />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/Home/Profile" component={UserProfile} />
            <Route path="/Home/upload" component={Upload} />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </div>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        {authenticated ? (
          loading ? (
            <Loading />
          ) : (
            RenderItem
          )
        ) : (
          <Redirect to={{ pathname: "/signin" }} />
        )}
      </React.Fragment>
    );
  }
}
export default ProtectedRoutes;
