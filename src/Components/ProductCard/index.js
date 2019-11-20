import React from "react";
import logo from "../../images/shoes.jpeg";
import heart from "../../images/svgs/Heart.svg";
import time from "../../images/svgs/Time.svg";
import { Redirect } from "react-router-dom";
class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.data,
      redirect: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      redirect: true
    });
  }
  render() {
    const { item, redirect } = this.state;
    return (
      <div onClick={this.handleClick} className="card--group">
        {redirect && (
          <Redirect to={{ pathname: "/description", state: item }} />
        )}

        <div className="card--profile">
          <img
            src={logo}
            className="rounded-circle card--profile--photo"
            alt="profile"
          />
          <span className="card--profile--name">{item.condition}</span>
          <span className="card--date">
            <img src={time} alt="time" /> {item.date}ago
          </span>
          <br />
        </div>
        <div className="d-none d-lg-block card--picture">
          <img src={item.pictureUrl || logo} alt="product card" />
        </div>
        <div className="card--body">
          <div className="d-block d-lg-none card--picture">
            <img src={item.pictureUrl} alt="product card" />
          </div>
          <div className="card--title">
            <p>{item.name} </p>
          </div>
          <div className="card--description">
            <p>{item.description}</p>
          </div>
          <div className="icons">
            <span className="price">$ {item.price}</span>
            <span className="heart">
              <img src={heart} alt="Heart " />
            </span>
            <span className="heart">
              <img src={heart} alt="Heart " />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
