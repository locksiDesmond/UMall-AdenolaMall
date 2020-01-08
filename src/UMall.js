import React from "react";
import "./css/umall.css";
import Routes from "./Routes/Routes";
import { ContextCreator } from "./Context/Context";
import Loading from "./SmallComponent/Loading";
import ErrorBoundary from "./SmallComponent/ErrorBoundary";

function UMall() {
  return (
    <div className="body">
      <ContextCreator.Consumer>
        {({ authenticated, loaded, user, firebase }) => {
          return (
            <>
              {loaded ? (
                <ErrorBoundary>
                  <Routes
                    user={user}
                    authenticated={authenticated}
                    loading={loaded}
                    firebase={firebase}
                  />
                </ErrorBoundary>
              ) : (
                <Loading />
              )}
            </>
          );
        }}
      </ContextCreator.Consumer>
    </div>
  );
}

export default UMall;
