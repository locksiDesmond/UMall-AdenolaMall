import React from "react";
function Badge(props) {
  return (
    <div
      style={{
        color: props.color ? props.color : "#fff",
        backgroundColor: props.bgcolor ? props.bgcolor : "#fff",
        border: props.color ? `1px solid ${props.color}` : "1px solid #000"
      }}
      className="notification--badge"
    >
      {props.title}
    </div>
  );
}

export default Badge;
