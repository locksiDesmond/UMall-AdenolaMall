import React from "react";
import Button from "react-bootstrap/Button";
function ButtonLg(props) {
  const { title } = props;
  return (
    <Button className="btn--large" {...props}>
      {title}
    </Button>
  );
}
export default ButtonLg;
