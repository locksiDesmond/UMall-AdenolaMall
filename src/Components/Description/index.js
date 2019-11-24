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
    return (
      <React.Fragment>
        <MainNav />
        <Descriptionbody items={this.state.items} />
      </React.Fragment>
    );
  }
}

export default Description;
