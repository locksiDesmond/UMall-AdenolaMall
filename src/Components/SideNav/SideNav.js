import React from "react";
import Dropdown from "../../SmallComponent/Dropdown";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobilePhone: [
        {
          id: 1,
          title: "Mobile  Phone",
          path: "/signin"
        },
        {
          id: 2,
          title: "Laptops"
        }
      ],
      mensWear: [
        {
          id: 1,
          title: "Clothes"
        },
        {
          id: 2,
          title: "Shoes"
        }
      ]
    };
  }
  render() {
    return (
      <div className="sidenav">
        <Dropdown title="Mobile Phone" item={this.state.mobilePhone} />
        <Dropdown title="Men's Wear" item={this.state.mensWear} />
      </div>
    );
  }
}

export default SideNav;
