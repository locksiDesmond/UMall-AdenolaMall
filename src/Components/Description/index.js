import React from "react";
import MainNav from "../Navbar/MainNav";
import Descriptionbody from "./DescriptionBody";
class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.location.state
    };
  }
  render() {
    const { item, userdata } = this.state.items;
    return (
      <React.Fragment>
        <MainNav />
        <Descriptionbody items={item} userdata={userdata} />
      </React.Fragment>
    );
  }
}

export default Description;
