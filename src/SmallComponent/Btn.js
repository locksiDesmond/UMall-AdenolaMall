import React from "react";

function Btn(props) {
  if (props.display === false) {
    return <></>;
  }
  return (
    <button className="btn--component" style={{ backgroundColor: props.color }}>
      {props.value}
    </button>
  );
}

export default Btn;
