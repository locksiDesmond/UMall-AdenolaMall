import React, { useState } from "react";
import Button from "react-bootstrap/Button";
function Btn(props) {
  const [over, setOver] = useState(false);
  const styles = {
    elements: {
      borderColor: props.color,
      color: props.color,
      backgroundColor: "#fff",
      padding: props.small ? ".3rem" : ".1rem .8rem .2rem  "
    },
    over: {
      backgroundColor: props.color,
      color: "#fff ",
      borderColor: "none",
      padding: props.small ? ".3rem" : ".1rem .8rem .2rem "
    }
  };

  return (
    <Button
      {...props}
      style={over ? styles.elements : styles.over}
      onMouseOver={() => {
        setOver(true);
      }}
      onMouseLeave={() => {
        setOver(false);
      }}
    >
      {props.title}
      {props.dropdown && (
        <div className="arrow">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </Button>
  );
}

export default Btn;
