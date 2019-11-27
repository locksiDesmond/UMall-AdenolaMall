import React from "react";
import MainNav from "./../Components/Navbar/MainNav";
import { Route, Switch } from "react-router-dom";
import Home from "./../Components/Home/MainBody";
import { ContextCreator } from "./../Context/Context";
import Upload from "./../Components/Upload/index";
import Loading from "../SmallComponent/Loading";
import SideNav from "../Components/SideNav/SideNav";
import ErrorPage from "./../SmallComponent/ErrorPage";
import DropdownItems from "./../Components/DropdownPages/DropdownItems";
import MainDrop from "./../Components/DropdownPages/MainDrop";
import Search from "./../Components/Search page/index";
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
  }
  render() {
    const { authenticated, loading, user } = this.context;
    const RenderItem = (
      <React.Fragment>
        <MainNav onClick={this.sideNavToggle} />
        <div className="body--content">
          <SideNav onClick={this.sideNavToggle} disabled={this.state.sidebar} />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route
              path="/Home/upload"
              component={() => (
                <Upload user={user} authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/home/main/Footwears"
              component={() => (
                <MainDrop state="Footwears" authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/home/main/Devices"
              component={() => (
                <MainDrop state="Devices" authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/home/main/Clothings"
              component={() => (
                <MainDrop state="Clothings" authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/home/main/Cosmetics"
              component={() => (
                <MainDrop state="Cosmetics" authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/home/main/Household items"
              component={() => (
                <MainDrop
                  state="Household items"
                  authenticated={authenticated}
                />
              )}
            />
            <Route
              path="/home/main/Clothings/Female"
              component={DropdownItems}
            />
            <Route path="/home/main/Clothings/Male" component={DropdownItems} />
            <Route
              path="/home/main/Footwears/Female"
              component={DropdownItems}
            />
            <Route path="/home/main/Footwears/Male" component={DropdownItems} />
            <Route
              path="/home/main/Household items/Used"
              component={DropdownItems}
            />
            <Route
              path="/home/main/Household items/New"
              component={DropdownItems}
            />
            <Route
              path="/home/main/Devices/Laptops"
              component={DropdownItems}
            />
            <Route
              path="/home/main/Devices/Mobile Phones"
              component={DropdownItems}
            />
            <Route
              path="/home/main/Devices/Other accessories"
              component={DropdownItems}
            />
            <Route
              path="/home/main/Cosmetics/Perfumes"
              component={DropdownItems}
            />
            <Route
              path="/home/main/Cosmetics/Creams"
              component={DropdownItems}
            />
            <Route path="/home/Search" component={Search} />

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
