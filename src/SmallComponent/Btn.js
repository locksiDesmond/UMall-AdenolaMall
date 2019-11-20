import React, { useState } from "react";
import Button from "react-bootstrap/Button";
function Btn(props) {
  const [over, setOver] = useState(false);
  const styles = {
    elements: {
      borderColor: props.color,
      color: props.color,
      backgroundColor: "#fff",
      padding: ".1rem .8rem .2rem  "
    },
    over: {
      backgroundColor: props.color,
      color: "#fff ",
      borderColor: "none",
      padding: ".1rem .8rem .2rem "
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
    </Button>
  );
}

export default Btn;
