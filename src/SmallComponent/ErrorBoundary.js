import React from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
class ErrorBoundary extends React.Component {
  state = {
    haserror: false,
    info: "",
    error: ""
  };
  componentDidCatch(error, info) {
    this.setState({ haserror: true, info: info, error: error });
  }
  getWhatappLink = () => {
    window.open(
      "https://api.whatsapp.com/send?phone=" +
        "+2348148191312" +
        "&text=%20" +
        "The bug I discovered  is " +
        this.state.info +
        " ," +
        this.state.error
    );
  };
  render() {
    return this.state.haserror ? (
      <h4>
        An error occurred <Link to={{ pathname: "/" }}>Go Home</Link>
        <hr />
        <p>
          if error persists Chat Locksi on
          <span onClick={this.getWhatappLink}>
            Click here
            <FaWhatsapp />
          </span>
        </p>
      </h4>
    ) : (
      this.props.children
    );
  }
}
export default ErrorBoundary;
