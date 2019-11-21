import React from "react";
import { BallBeat } from "react-pure-loaders";

function Loading(props) {
  return (
    <div {...props} className="loading">
      <BallBeat color="#05aff2" loading={true} />
    </div>
  );
}

export default Loading;
