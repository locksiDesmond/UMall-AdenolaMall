import React from "react";
import logo from "./../images/svgs/Dropdown.svg";
import logo2 from "./../images/svgs/Path 36.svg";
import { Link } from "react-router-dom";
class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      redirect: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(() => ({
      isOpen: !this.state.isOpen
    }));
  }
  render() {
    const { isOpen } = this.state;
    const { item, title } = this.props;
    return (
      <div className="sidenav--dropdown">
        <div className="dropdown--list">
          <Link
            onClick={this.props.onClick}
            to={{ pathname: `/Home/main/${title}`, state: title }}
          >
            <span style={{ color: "#000" }}>{title}</span>
          </Link>
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
                <Link
                  onClick={() => {
                    this.props.onClick();
                    this.handleClick();
                  }}
                  key={item.id}
                  to={{
                    pathname:
                      `/home/main/${title}/${item.title}` || "errorpage",
                    state: item
                  }}
                >
                  <li className="dropdown--item--list">
                    <img
                      className="img-thumbnail sidenav--avatar"
                      src={item.avatar}
                      alt="icon"
                    />
                    {item.title}
                  </li>
                </Link>
              );
            })}
        </ul>
      </div>
    );
  }
}
export default Dropdown;
