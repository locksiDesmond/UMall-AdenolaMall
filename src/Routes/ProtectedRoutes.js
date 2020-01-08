import React from "react";
import Loadable from "react-loadable";
import { Route, Switch } from "react-router-dom";
import { ContextCreator } from "./../Context/Context";
import Loading from "../SmallComponent/Loading";
const MainNav = Loadable({
  loader: () => import("./../Components/Navbar/MainNav"),
  loading: Loading
});
const SideNav = Loadable({
  loader: () => import("../Components/SideNav/SideNav"),
  loading: Loading
});
const ErrorPage = Loadable({
  loader: () => import("./../SmallComponent/ErrorPage"),
  loading: Loading
});
const UserDropdown = Loadable({
  loader: () => import("./../Components/DropdownPages/UserDropdown"),
  loading: Loading
});
const DropdownItems = Loadable({
  loader: () => import("./../Components/DropdownPages/DropdownItems"),
  loading: Loading
});
const MainDrop = Loadable({
  loader: () => import("./../Components/DropdownPages/MainDrop"),
  loading: Loading
});
const Upload = Loadable({
  loader: () => import("./../Components/Upload/index"),
  loading: Loading
});
const Search = Loadable({
  loader: () => import("./../Components/Search page/index"),
  loading: Loading
});
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
        <MainNav handleclick={this.sideNavToggle} />
        <div className="body--content">
          <SideNav
            handleclick={this.sideNavToggle}
            disabled={this.state.sidebar}
          />
          <Switch>
            <Route
              path="/umall/Post"
              component={() => (
                <Upload user={user} authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/umall/Others"
              component={() => (
                <MainDrop state="Others" authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/umall/Footwears"
              component={() => (
                <MainDrop state="Footwears" authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/umall/Devices"
              component={() => (
                <MainDrop state="Devices" authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/umall/Clothings"
              component={() => (
                <MainDrop state="Clothings" authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/umall/Cosmetics"
              component={() => (
                <MainDrop state="Cosmetics" authenticated={authenticated} />
              )}
            />
            <Route
              exact
              path="/umall/Household items"
              component={() => (
                <MainDrop
                  state="Household items"
                  authenticated={authenticated}
                />
              )}
            />
            <Route path="/umall/Clothings/Female" component={DropdownItems} />
            <Route path="/umall/Clothings/Male" component={DropdownItems} />
            <Route path="/umall/Footwears/Female" component={DropdownItems} />
            <Route path="/umall/Footwears/Male" component={DropdownItems} />
            <Route
              path="/umall/Household items/Used"
              component={DropdownItems}
            />
            <Route
              path="/umall/Household items/New"
              component={DropdownItems}
            />
            <Route path="/umall/Devices/Laptops" component={DropdownItems} />
            <Route
              path="/umall/Devices/Mobile Phones"
              component={DropdownItems}
            />
            <Route
              path="/umall/Devices/Other accessories"
              component={DropdownItems}
            />
            <Route path="/umall/Cosmetics/Perfumes" component={DropdownItems} />
            <Route path="/umall/Cosmetics/Makeups" component={DropdownItems} />
            <Route
              path="/umall/Cosmetics/Jewelries"
              component={DropdownItems}
            />
            <Route path="/umall/Cosmetics/Others" component={DropdownItems} />
            <Route path="/umall/Cosmetics/Creams" component={DropdownItems} />
            <Route path="/umall/Vendors" component={UserDropdown} />
            <Route path="/umall/Search" component={Search} />

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
