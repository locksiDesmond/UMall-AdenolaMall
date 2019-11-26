import React from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

function ButtonLg(props) {
  const { title } = props;
  return (
    <Button
      disabled={props.loading}
      className={props.small ? "btn--small" : "btn--large"}
      {...props}
    >
      {props.loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          style={{marginRight:".4rem"}}
        />
      )}
      {title}
    </Button>
  );
}
export default ButtonLg;
