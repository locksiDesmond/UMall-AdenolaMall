import React from "react";
import UMall from "./UMall";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//import "./css/bootstrap.min.css";
import ContextClass from "./Context/Context";

function App() {
  return (
    <React.Fragment>
      <ContextClass>
        <UMall />
      </ContextClass>
    </React.Fragment>
  );
}

export default App;
