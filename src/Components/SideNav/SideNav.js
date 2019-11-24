import React from "react";
import Dropdown from "../../SmallComponent/Dropdown";
import laptop from "../../images/svgs/laptop.svg";
import cellphone from "../../images/svgs/new/cell-phone.svg";
import shirt from "../../images/svgs/new/shirt.svg";
import woman from "../../images/svgs/new/shirt (1).svg";
import perfume from "../../images/svgs/new/perfume-bottle.svg";
import femaleShoes from "../../images/svgs/new/high-heel-shoe.svg";
import gel from "../../images/svgs/new/gel.svg";
import mensShoe from "../../images/svgs/new/shoes.svg";
class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Devices: [
        {
          id: 1,
          title: "Mobile Phones",
          category: "Devices",
          avatar: cellphone
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
      Clothings: [
        {
          id: 1,
          title: "Male",
          category: "Clothings",
          avatar: shirt
        },
        {
          id: 2,
          title: "Female",
          path: "/home/clothing",
          category: "Clothings",
          avatar: woman
        }
      ],
      Footwear: [
        {
          id: 0,
          title: "Male",
          category: "Footwear",
          avatar: mensShoe
        },
        { id: 1, title: "female", category: "Footwear", avatar: femaleShoes }
      ],
      Cosmetics: [
        {
          id: 0,
          title: "Creams",
          category: "Cosmetics",
          avatar: gel
        },
        { id: 1, title: "Perfumes", category: "Cosmetics", avatar: perfume }
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
          title="Clothings"
          onClick={this.props.onClick}
          item={this.state.Clothings}
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
