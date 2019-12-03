import React from "react";
import MainNav from "./../Components/Navbar/MainNav";
import { Route, Switch } from "react-router-dom";
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
        <MainNav onclick={this.sideNavToggle} />
        <div className="body--content">
          <SideNav onclick={this.sideNavToggle} disabled={this.state.sidebar} />
          <Switch>
            <Route
              path="/umall/Post"
              component={() => (
                <Upload user={user} authenticated={authenticated} />
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
            <Route path="/umall/Cosmetics/Mkeups" component={DropdownItems} />
            <Route
              path="/umall/Cosmetics/Jewelries"
              component={DropdownItems}
            />
            <Route path="/umall/Cosmetics/Others" component={DropdownItems} />

            <Route path="/umall/Cosmetics/Creams" component={DropdownItems} />
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
