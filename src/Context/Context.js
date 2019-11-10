import React, { createContext } from "react";

export const ContextCreate = createContext();

class WithFirebaseOf extends React.Component {
  render() {
    return <ContextCreate.Provider value="{firebase}"></ContextCreate.Provider>;
  }
}

export default WithFirebaseOf;
