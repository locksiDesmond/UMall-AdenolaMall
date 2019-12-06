import React from "react";
import { Redirect } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import img from "../../images/svgs/boy.svg";
import { IoMdTime } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { MdFiberNew } from "react-icons/md";
import { DeleteData, DeletePicture } from "./../DropdownPages/FetchData";
import { firebase } from "./../../Firebase/Firebase";

class ProductClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.data,
      redirect: false,
      likes: this.props.data.likes,
      liked: false,
      userdata: this.props.newuser
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    if (this.state.item.likes) {
      const isLiked = this.state.item.likes.includes(this.props.user.uid); //important
      if (isLiked) {
        this.setState({ liked: true });
      } else {
        this.setState({ liked: false });
      }
    }
  }
  handleClick() {
    if (window.location.pathname === "/description") {
      this.props.handlerefresh(this.state.item, this.state.userdata);
    } else {
      this.setState({
        redirect: true
      });
    }
  }
  handleLike() {
    if (this.props.authenticated) {
      if (this.state.liked) {
        const likes = this.state.likes;
        const index = likes.indexOf(this.props.user.uid);
        likes.splice(index, 1);
        this.props.firebase.store
          .collection(this.state.item.category)
          .doc(this.state.item.doc)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(
              this.props.user.uid
            )
          });
        this.setState({ liked: !this.state.liked, likes: likes });
      } else {
        const likes = this.state.likes;
        likes.push(this.props.user.uid);
        this.props.firebase.store
          .collection(this.state.item.category)
          .doc(this.state.item.doc)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(this.props.user.uid)
          });
        this.setState({ liked: !this.state.liked, likes: likes });
      }
    } else {
      alert("you are not a register user");
    }
  }
  handleDelete() {
    const { item } = this.state;
    DeleteData(item.category, item.doc);
    this.props.firebase.store
      .collection("Users")
      .doc(this.props.user.uid)
      .set(
        {
          materialSold: firebase.firestore.FieldValue.increment(1)
        },
        { merge: true }
      );
    for (let i = 0; i <= item.picturename.length - 1; i++) {
      DeletePicture(item.picturename[i]);
    }
  }

  render() {
    const { item, redirect, userdata } = this.state;
    const { time, isDeleteable } = this.props;
    return (
      <div onClick={this.handleClick} className="card--group">
        {redirect && (
          <Redirect
            to={{ pathname: "/description", state: { item, userdata } }}
          />
        )}

        <div className="card--profile">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/umall-adenola-mall-production.appspot.com/o/Defaultphoto%2Fboy.svg?alt=media&token=82509f3a-3d6c-42aa-8f35-2b60aed21209"
            }
            className="rounded-circle card--profile--photo"
            alt="profile"
          />
          <span className="card--profile--name capitalize">
            {userdata.username}
          </span>
          <span className=" card--date">
            <IoMdTime style={{ color: "02aff2", marginTop: ".2rem" }} />
            {time}
          </span>

          <br />
        </div>
        <div
          className="d-none d-lg-block card--picture"
          style={{ position: "relative" }}
        >
          <img src={item.pictureUrl[0]} alt="product card" />
          {item.condition === "New" && (
            <span style={{ position: "absolute", right: "1rem" }}>
              <MdFiberNew color="#f4754e" style={{ fontSize: "2rem" }} />
            </span>
          )}
        </div>
        <div className="card--body">
          <div
            className="d-block d-lg-none card--picture"
            style={{ position: "relative" }}
          >
            <img src={item.pictureUrl[0]} alt="product card" />
            {item.condition === "New" && (
              <span style={{ position: "absolute", top: "0", right: "0rem" }}>
                <MdFiberNew color="#f4754e" style={{ fontSize: "2rem" }} />
              </span>
            )}
          </div>
          <div className="card--title">
            <p className="capitalize">{item.name} </p>
          </div>
          <div className="card--description">
            <p>{item.description}</p>
            <hr style={{ height: "1px", color: "#f4754e" }} />
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
              <span style={{ fontSize: ".7rem" }}>
                {this.state.likes
                  ? this.state.likes.length === 0
                    ? " "
                    : this.state.likes.length
                  : ""}
              </span>
            </span>

            {isDeleteable && (
              <span
                className="sold"
                onClick={e => {
                  e.stopPropagation();
                  this.handleDelete();
                }}
                style={{ color: "green" }}
              >
                sold
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductClass;
