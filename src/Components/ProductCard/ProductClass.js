import React from "react";
// import heart from "../../images/svgs/Heart.svg";
import time from "../../images/svgs/Time.svg";
import { Redirect } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import img from "../../images/svgs/boy.svg";
import { IoIosHeart } from "react-icons/io";
class ProductClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.data,
      redirect: false,
      liked: false,
      userdata: this.props.newuser
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }
  handleClick() {
    this.setState({
      redirect: true
    });
  }
  handleLike() {
    this.setState({
      liked: !this.state.liked
    });
  }
  render() {
    const { item, redirect, userdata } = this.state;
    return (
      <div onClick={this.handleClick} className="card--group">
        {redirect && (
          <Redirect
            to={{ pathname: "/description", state: { item, userdata } }}
          />
        )}

        <div className="card--profile">
          <img
            src={userdata.photoUrl || img}
            className="rounded-circle card--profile--photo"
            alt="profile"
          />
          <span className="card--profile--name capitalize">
            {userdata.username}
          </span>
          <span className="card--date">
            <img src={time} alt="time" /> {item.date}ago
          </span>
          <br />
        </div>
        <div className="d-none d-lg-block card--picture">
          <img src={item.pictureUrl[0]} alt="product card" />
        </div>
        <div className="card--body">
          <div className="d-block d-lg-none card--picture">
            <img
              src={item.pictureUrl[0] || userdata.photoUrl}
              alt="product card"
            />
          </div>
          <div className="card--title">
            <p className="capitalize">{item.name} </p>
          </div>
          <div className="card--description">
            <p>{item.description}</p>
          </div>
          <div className="icons">
            <span className="price">&#8358;{item.price}</span>
            <span
              className="heart"
              onClick={e => {
                e.stopPropagation();
                this.handleLike(e);
              }}
            >
              {this.state.liked ? (
                <IoIosHeart style={{ color: "red" }} />
              ) : (
                <FaRegHeart style={{ fill: "black" }} />
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductClass;
