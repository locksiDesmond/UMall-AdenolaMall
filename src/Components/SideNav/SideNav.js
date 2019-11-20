import React from "react";
import Dropdown from "../../SmallComponent/Dropdown";
import laptop from "../../images/svgs/laptop.svg";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Devices: [
        {
          id: 1,
          title: "Mobile Phones",
          category: "Devices"
        },
        {
          id: 2,
          title: "Laptops",
          avatar: laptop,
          category: "Devices"
        },
        {
          id: 3,
          title: "Other accessories",
          category: "Devices"
        }
      ],
      clothing: [
        {
          id: 1,
          title: "Male",
          category: "Clothings"
        },
        {
          id: 2,
          title: "Female",
          path: "/home/clothing",
          category: "Clothings"
        }
      ],
      Footwear: [
        {
          id: 0,
          title: "Male",
          category: "Footwear"
        },
        { id: 1, title: "female", category: "Footwear" }
      ],
      Cosmetics: [
        {
          id: 0,
          title: "Creams",
          category: "Cosmetics"
        },
        { id: 1, title: "Perfumes", category: "Cosmetics" }
      ],
      HouseItems: [
        {
          id: 0,
          title: "New",
          category: "Household items"
        },
        {
          id: 1,
          title: "Used",
          category: "Household items"
        }
      ]
    };
  }
  render() {
    return (
      <div className={`sidenav ${this.props.disabled && "show--nav"}`}>
        <Dropdown
          title="Devices"
          onClick={this.props.onClick}
          item={this.state.Devices}
        />
        <Dropdown
          title="Clothing"
          onClick={this.props.onClick}
          item={this.state.clothing}
        />
        <Dropdown
          title="Cosmetics"
          onClick={this.props.onClick}
          item={this.state.Cosmetics}
        />
        <Dropdown
          title="Footwears"
          onClick={this.props.onClick}
          item={this.state.Footwear}
        />
        <Dropdown
          title="Household Appliances"
          onClick={this.props.onClick}
          item={this.state.HouseItems}
        />
      </div>
    );
  }
}

export default SideNav;
