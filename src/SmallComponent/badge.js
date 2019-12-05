import React from "react";
function Badge(props) {
  return (
    <span
      style={{
        color: props.color ? props.color : "#fff",
        backgroundColor: props.bgcolor ? props.bgcolor : "#fff",
        border: props.color ? `1px solid ${props.color}` : "1px solid #000",
        height:"1.2rem",
        width:"1.2rem",
        fontWeight:"900",
        fontSize: !props.padding ? " .9rem" : ".8rem",
        paddingTop:!props.padding ? ".05rem" : ""
      }}
      className="notification--badge"
    >
      {props.title}
    </span>
  );
}

export default Badge;
