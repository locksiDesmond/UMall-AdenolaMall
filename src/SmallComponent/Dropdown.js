import React from "react";
import logo from "./../images/svgs/Dropdown.svg";
import logo2 from "./../images/svgs/Path 36.svg";
import { Link } from "react-router-dom";
class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      headerTitle: this.props.title
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(() => ({
      isOpen: !this.state.isOpen
    }));
  }
  render() {
    const { headerTitle, isOpen } = this.state;
    const { item } = this.props;
    return (
      <div className="sidenav--dropdown">
        <div className="dropdown--list">
          <span>{headerTitle}</span>
          <button
            className="dropdown--icon a"
            onClick={() => this.handleClick()}
          >
            <img
              className="dropdown--svg"
              src={isOpen ? logo2 : logo}
              alt="dropdown icon"
            />
          </button>
        </div>

        <ul className="dropdown--item ">
          {isOpen &&
            item.map(item => {
              return (
                <Link key={item.id} to={{ pathname: item.path || "errorpage" }}>
                  <li className="dropdown--item--list">{item.title}</li>
                </Link>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default Dropdown;
