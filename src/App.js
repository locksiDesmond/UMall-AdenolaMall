import React from "react";
import "./App.css";
import UMall from "./UMall";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./css/bootstrap.min.css";
import ContextClass from "./Context/Context";

function App() {
  return (
    <div className="App">
      <ContextClass>
        <UMall />
      </ContextClass>
    </div>
  );
}

export default App;
