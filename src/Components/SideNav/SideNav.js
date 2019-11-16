import React from "react";
import Dropdown from "../../SmallComponent/Dropdown";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Devices: [
        {
          id: 1,
          title: "Mobile  Phone",
          path: "/signin"
        },
        {
          id: 2,
          title: "Laptops"
        },
        {
          id: 3,
          title: "other accessories"
        }
      ],
      clothing: [
        {
          id: 1,
          title: "Clothes"
        },
        {
          id: 2,
          title: "Shoes"
        }
      ],
      Footwear: [
        {
          id: 0,
          title: "male"
        },
        { id: 1, title: "female" }
      ],
      Cosmetics: [
        {
          id: 0,
          title: "creams"
        },
        { id: 1, title: "perfumes" }
      ],
      HouseItems: [
        {
          id: 0,
          title: "New"
        },
        {
          id: 1,
          title: "Used"
        }
      ]
    };
  }
  render() {
    return (
      <div className="sidenav">
        <Dropdown title="Devices" item={this.state.Devices} />
        <Dropdown title="Clothing" item={this.state.clothing} />
        <Dropdown title="Cosmetics" item={this.state.Cosmetics} />
        <Dropdown title="Footwears" item={this.state.Footwear} />
        <Dropdown title="Household Appliances" item={this.state.HouseItems} />
      </div>
    );
  }
}

export default SideNav;
