import React from "react";
import "./index.css";
import { IoIosHeart } from "react-icons/io";
import { FiThumbsUp } from "react-icons/fi";
import sales from "../../images/svgs/goods.svg";
import { IoMdShareAlt } from "react-icons/io";
import { Redirect } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { firebase } from "./../../Firebase/Firebase";
class VendorsClass extends React.Component {
  state = {
    redirect: false,
    liked: false,
    item: this.props.item,
    likes: this.props.item.likes
  };
  handleClick = () => {
    this.setState({ redirect: true });
  };
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
  handleLike = () => {
    if (this.props.authenticated) {
      if (this.state.liked) {
        const likes = this.state.likes || [];
        const index = likes.indexOf(this.props.user.uid);
        likes.splice(index, 1);
        this.props.firebase.store
          .collection("Users")
          .doc(this.state.item.doc)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(
              this.props.user.uid
            )
          });
        this.setState({ liked: !this.state.liked, likes: likes });
      } else {
        const likes = this.state.likes || [];
        likes.push(this.props.user.uid);
        this.props.firebase.store
          .collection("Users")
          .doc(this.state.item.doc)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(this.props.user.uid)
          });
        this.setState({ liked: !this.state.liked, likes: likes });
      }
    } else {
      alert("you are not a register user");
    }
  };
  render() {
    const { item } = this.state;
    return (
      <div onClick={this.handleClick} className="card--group vendor--group">
        {this.state.redirect && (
          <Redirect
            to={{
              pathname: "/vendorsdescription",
              state: { item: "Vendors", userdata: item }
            }}
          />
        )}
        <span
          className="absolutes"
          onClick={e => {
            e.stopPropagation();
            this.handleLike();
          }}
        >
          {this.state.liked ? (
            <IoIosHeart style={{ color: "red" }} />
          ) : (
            <FaRegHeart style={{ fill: "black" }} />
          )}
        </span>
        <div className="product-image-name block-center">
          <img
            className="rounded-circle product--image"
            src={item.photoUrl}
            alt="profile"
          />

          <p style={{ textAlign: "center" }} className="capitalize">
            {item.username}
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: ".7rem",
              whiteSpace: "nowrap"
            }}
          >
            Joined :
            <span style={{ whiteSpace: "nowrap" }}>
              {item.metadata && item.metadata.creationTime.slice(8, 16)}
            </span>
          </p>
        </div>
        <div className="flex">
          <div>
            <div className="rounded--circle">
              <FiThumbsUp style={{ color: "#02aff2" }} />
            </div>
            <p style={{ textAlign: "center", whiteSpace: "nowrap" }}>
              <span>
                {this.state.likes
                  ? this.state.likes.length === 0
                    ? " "
                    : this.state.likes.length
                  : ""}
              </span>
            </p>
            <p style={{ textAlign: "center", whiteSpace: "nowrap" }}>Likes</p>
          </div>

          <div>
            <div className="rounded--circle">
              <img src={sales} alt="sales" />
            </div>
            <p style={{ textAlign: "center", whiteSpace: "nowrap" }}>
              {item.materialSold}
            </p>
            <p style={{ textAlign: "center", whiteSpace: "nowrap" }}>Sales</p>
          </div>
          <div>
            <div className="rounded--circle">
              <IoMdShareAlt style={{ color: "#f4754e" }} />
            </div>
            <p style={{ textAlign: "center", whiteSpace: "nowrap" }}>
              {item.materialPosted}
            </p>
            <p style={{ textAlign: "center", whiteSpace: "nowrap" }}>Posted</p>
          </div>
        </div>
      </div>
    );
  }
}
export default VendorsClass;
