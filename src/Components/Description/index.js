import React from "react";
import MainNav from "../Navbar/MainNav";
import Descriptionbody from "./DescriptionBody";
import SideNav from "./../SideNav/SideNav";
class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.location.state,
      sidebar: false
    };
    this.handleSidebar = this.handleSidebar.bind(this);
  }
  handleSidebar() {
    this.setState({
      sidebar: !this.state.sidebar
    });
  }

  render() {
    const { item, userdata } = this.state.items;
    return (
      <React.Fragment>
        <MainNav onClick={this.handleSidebar} />
        <div
          className={` ${
            this.state.sidebar ? "user--profile" : "displa--none"
          }`}
        >
          <SideNav onClick={this.handleSidebar} disabled={this.state.sidebar} />
          <Descriptionbody items={item} userdata={userdata} />
        </div>
      </React.Fragment>
    );
  }
}

export default Description;
