import React, { createContext } from "react";
import firebase from "./../Firebase/Firebase";

export const ContextCreator = createContext();
class ContextClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }
  render() {
    return (
      <ContextCreator.Provider value={{ ...this.state }} firebase={firebase}>
        {this.children}
      </ContextCreator.Provider>
    );
  }
}

export default ContextClass;
