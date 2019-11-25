import React from "react";
import "./css/umall.css";
import Routes from "./Routes/Routes";
import { ContextCreator } from "./Context/Context";
import Loading from "./SmallComponent/Loading";

function UMall() {
  return (
    <div className="app">
      <div className="body">
        <ContextCreator.Consumer>
          {({ authenticated, loaded }) => {
            return (
              <>
                {loaded ? (
                  <Routes authenticated={authenticated} loading={loaded} />
                ) : (
                  <Loading />
                )}
              </>
            );
          }}
        </ContextCreator.Consumer>
      </div>
    </div>
  );
}

export default UMall;
