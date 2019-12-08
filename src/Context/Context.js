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
    // this.setName = this.handleName.bind(this);
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
        const metadata = { ...user.metadata };
        const created = new Date(this.state.user.metadata.creationTime);
        const last = new Date(this.state.user.metadata.lastSignInTime);
        if (last - created !== 0) {
          firebase
            .firestore()
            .collection("Users")
            .doc(this.state.user.uid)
            .update({
              metadata: metadata,
              username: this.state.user.displayName
            });
        }
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
        value={{
          ...this.state,
          firebase: new Firebase()
        }}
      >
        <IconContext.Provider value={{ className: "global-icon" }}>
          {this.props.children}
        </IconContext.Provider>
      </ContextCreator.Provider>
    );
  }
}

export default ContextClass;
