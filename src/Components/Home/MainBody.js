import React from "react";
import MainImage from "./MainImage";
import Recent from "./Recent";
import { ContextCreator } from "./../../Context/Context";
import Loading from "./../../SmallComponent/Loading";
import { Redirect } from "react-router-dom";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }
  static contextType = ContextCreator;

  componentDidUpdate() {
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
