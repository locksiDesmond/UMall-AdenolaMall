import React from "react";
import MainNav from "../Navbar/MainNav";
import { firebase } from "./../../Firebase/Firebase";

import Descriptionbody from "./DescriptionBody";
import SideNav from "./../SideNav/SideNav";
import { ContextCreator } from "./../../Context/Context";
class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.location.state.item,
      sidebar: false,
      likes: this.props.location.state.item.likes,
      liked: false,
      userdata: this.props.location.state.userdata,
      error: ""
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleSidebar = this.handleSidebar.bind(this);
  }
  static contextType = ContextCreator;
  handleSidebar() {
    this.setState({
      sidebar: !this.state.sidebar
    });
  }
  componentDidMount() {
    const { user } = this.context;
    if (this.state.item.likes) {
      const isLiked = this.state.item.likes.includes(user.uid); //important
      if (isLiked) {
        this.setState({ liked: true });
      } else {
        this.setState({ liked: false });
      }
    }
  }
  componentDidUpdate() {
    if (this.state.sidebar) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
  }

  handleLike() {
    const { authenticated } = this.context;

    if (authenticated) {
      if (this.state.liked) {
        const { user } = this.context;
        const likes = this.state.likes;
        const index = likes.indexOf(user.uid);
        likes.splice(index, 1);
        firebase
          .firestore()
          .collection(this.state.item.category)
          .doc(this.state.item.doc)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(user.uid)
          });
        this.setState({ liked: !this.state.liked, likes: likes });
      } else {
        const likes = this.state.likes;
        const { user } = this.context;
        likes.push(user.uid);
        firebase
          .firestore()
          .collection(this.state.item.category)
          .doc(this.state.item.doc)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(user.uid)
          });
        this.setState({ liked: !this.state.liked, likes: likes });
      }
    } else {
      alert("you are not a register user");
      this.setState({ error: "you are notr a registered user" });
    }
  }

  render() {
    const { item, userdata, liked, likes } = this.state;
    return (
      <React.Fragment>
        <MainNav handleclick={this.handleSidebar} />
        <div
          className={` ${
            this.state.sidebar ? "user--profile" : "displa--none"
          }`}
        >
          <SideNav
            handleclick={this.handleSidebar}
            disabled={this.state.sidebar}
          />
          <Descriptionbody
            items={item}
            likes={likes}
            handleclick={this.handleLike}
            userdata={userdata}
            liked={liked}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Description;
