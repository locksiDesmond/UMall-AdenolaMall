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
import Clothing from "./../Components/DropdownPages/Clothings";
class ProtectedRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      sidebar: false
    };
    this.sideNavToggle = this.sideNavToggle.bind(this);
  }
  static contextType = ContextCreator;
  sideNavToggle() {
    this.setState({
      sidebar: !this.state.sidebar
    });
    console.log("toggle");
  }
  render() {
    const { authenticated, loading } = this.context;
    const RenderItem = (
      <React.Fragment>
        <MainNav onClick={this.sideNavToggle} />
        <Link to={{ pathname: "/home/" }}>Home </Link>
        <Link to={{ pathname: "/home/Profile" }}>Profile</Link>
        <Link to={{ pathname: "/home/upload" }}>Upload Dp</Link>
        <div className="body--content">
          <SideNav onClick={this.sideNavToggle} disabled={this.state.sidebar} />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/Home/Profile" component={UserProfile} />
            <Route path="/Home/upload" component={Upload} />
            <Route path="/home/Clothing" component={Clothing} />
            <Route
              path="*"
              component={() => <ErrorPage className="main--content" />}
            />
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
