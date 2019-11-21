import React from "react";
import MainNav from "./../Components/Navbar/MainNav";
import { Route, Switch, Link } from "react-router-dom";
import UserProfile from "./../Components/UserProfile/index";
import Home from "./../Components/Home/MainBody";
import { ContextCreator } from "./../Context/Context";
import Upload from "./../Components/Upload/index";
import Loading from "../SmallComponent/Loading";
import SideNav from "../Components/SideNav/SideNav";
import ErrorPage from "./../SmallComponent/ErrorPage";
import Clothing from "./../Components/DropdownPages/Clothings";
import MainDrop from "./../Components/DropdownPages/MainDrop";
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
            <Route
              path="/Home/upload"
              component={() => <Upload authenticated={authenticated} />}
            />
            <Route path="/home/main/Footwears" component={MainDrop} />
            <Route path="/home/main/Devices" component={MainDrop} />
            <Route exact path="/home/main/Clothings" component={MainDrop} />
            <Route path="/home/main/Cosmetics" component={MainDrop} />
            <Route
              path="/home/main/Household Appliances"
              component={MainDrop}
            />
            <Route path="/home/main/Clothings/Female" component={Clothing} />
            <Route path="/home/main/Clothings/Male" component={Clothing} />
            <Route path="/home/main/Clothings/Laptops" component={Clothing} />
            <Route
              path="/home/main/Clothings/Mobile Phones"
              component={Clothing}
            />
            <Route path="/home/main/Clothings/female" component={Clothing} />
            <Route path="/home/main/Clothings/female" component={Clothing} />

            <Route
              path="*"
              component={() => <ErrorPage className="main--content" />}
            />
          </Switch>
        </div>
      </React.Fragment>
    );
    return (
      <React.Fragment>{loading ? <Loading /> : RenderItem}</React.Fragment>
    );
  }
}
export default ProtectedRoutes;
// {authenticated ? (
//   loading ? (
//     <Loading />
//   ) : (
//     RenderItem
//   )
// ) : (
//   <Redirect to={{ pathname: "/signin" }} />
// )
