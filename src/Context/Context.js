import React, { createContext } from "react";
import { firebase } from "./../Firebase/Firebase";

export const ContextCreator = createContext();
class ContextClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      authenticated: false,
      displayName: "",
      loaded: false
    };
  }
  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const email = user.email;
        this.setState({
          displayName: email,
          authenticated: true,
          loaded: true,
          user: user
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
      <ContextCreator.Provider value={{ ...this.state }}>
        {this.props.children}
      </ContextCreator.Provider>
    );
  }
}

export default ContextClass;
