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
    this.handleclick = this.handleclick.bind(this);
  }
  handleclick() {
    this.setState(() => ({
      isOpen: !this.state.isOpen
    }));
  }
  render() {
    const { isOpen } = this.state;
    const { item, title, comingsoon } = this.props;
    return (
      <div className="sidenav--dropdown">
        <div className="dropdown--list">
          <Link
            onClick={this.props.handleclick}
            to={{
              pathname: `/umall/${this.props.category || title}`,
              state:
                title === "Others" ? { title: "Others", category: "stuf" } : title
            }}
          >
            <span style={{ color: "#000" }}>{title}</span>
          </Link>
          <button
            className="dropdown--icon a"
            onClick={() => this.handleclick()}
          >
            {!comingsoon && (
              <img
                className="dropdown--svg"
                src={isOpen ? logo2 : logo}
                alt="dropdown icon"
              />
            )}
          </button>
        </div>

        <ul className="dropdown--item ">
          {isOpen &&
            item.map(item => {
              return (
                <Link
                  onClick={() => {
                    this.props.handleclick();
                    this.handleclick();
                  }}
                  key={item.id}
                  to={{
                    pathname:
                      `/umall/${this.props.category || title}/${item.title}` ||
                      "errorpage",
                    state: item
                  }}
                >
                  <li
                    className="dropdown--item--list"
                    style={{
                      margin: !item.avatar && " .5rem .5rem .5rem 2.3rem"
                    }}
                  >
                    {item.avatar && (
                      <img
                        className="img-thumbnail sidenav--avatar"
                        src={item.avatar}
                        alt="icon"
                      />
                    )}

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
