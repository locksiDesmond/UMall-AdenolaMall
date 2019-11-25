import React, { createContext } from "react";
import Firebase, { firebase } from "./../Firebase/Firebase";
import { IconContext } from "react-icons";
export const ContextCreator = createContext();
class ContextClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      authenticated: false,
      displayName: "",
      loaded: false,
      phoneNumber: ""
    };
  }
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          displayName: user.displayName,
          authenticated: true,
          loaded: true,
          user: user,
          phoneNumber: user.phoneNumber
        });
      } else {
        this.setState({
          authenticated: false,
          loaded: true
        });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <ContextCreator.Provider
        value={{ ...this.state, firebase: new Firebase() }}
      >
        <IconContext.Provider value={{ className: "global-icon" }}>
          {this.props.children}
        </IconContext.Provider>
      </ContextCreator.Provider>
    );
  }
}

export default ContextClass;
