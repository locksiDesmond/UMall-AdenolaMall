import React from "react";
import MainImage from "./MainImage";
import Recent from "./Recent";
import { ContextCreator } from "./../../Context/Context";
// import { firebase } from "./../../Firebase/Firebase";
import Loading from "./../../SmallComponent/Loading";
import { Redirect } from "react-router-dom";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: []
    };
    this.changeState = this.changeState.bind(this);
  }
  static contextType = ContextCreator;
  changeState(datas) {
    console.log(datas);
  }
  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("Clothings")
    //   .where("condition", "==", "Clothings")
    //   .get()
    //   .then(function(querySnapshot) {
    //     querySnapshot.forEach(function(doc) {
    //       // doc.data() is never undefined for query doc
    //       this.changeState(doc);
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    //   });
    // const byte = firebase
    //   .firestore()
    //   .collection("Clothings")
    //   .where("test", "==", true);
    // byte
    //   .get()
    //   .then(snapshot => {
    //     const items = snapshot.docs.map(doc => ({
    //       id: doc.id,
    //       ...doc.data()
    //     }));
    //     this.setState({
    //       data: items,
    //       loading: true
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   });
    // const now = Date.now();
    // const date = now - data.date;
    // const newData = date.toString();
    // console.log(newData);
    // var msec = date;
    // var hh = Math.floor(msec / 1000 / 60 / 60);
    // msec -= hh * 1000 * 60 * 60;
    // var mm = Math.floor(msec / 1000 / 60);
    // msec -= mm * 1000 * 60;
    // var ss = Math.floor(msec / 1000);
    // msec -= ss * 1000;
    // console.log(hh, mm, ss);
  }
  render() {
    return (
      <div className="main--content">
        {this.state.error && <Redirect to={{ pathname: "*" }} />}
        {!this.state.loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <MainImage />
            <Recent />
            <h2>Drop your files here</h2>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Home;
