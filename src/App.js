import React from "react";
import "./App.css";
import UMall from "./UMall";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./css/bootstrap.min.css";
import { ContextCreator } from "./Context/Context";

function App() {
  return (
    <div className="App">
      <ContextCreator.Provider>
        <UMall />
      </ContextCreator.Provider>
    </div>
  );
}

export default App;
