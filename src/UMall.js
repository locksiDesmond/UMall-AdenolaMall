import React from "react";
import "./css/umall.css";
import Routes from "./Routes/Routes";
import { ContextCreator } from "./Context/Context";

function UMall() {
  return (
    <div className="app">
      <div className="body">
        <ContextCreator.Consumer>
          {({ loaded }) => {
            return <> {loaded ? <Routes /> : <p>Loading</p>}</>;
          }}
        </ContextCreator.Consumer>
      </div>
    </div>
  );
}

export default UMall;
