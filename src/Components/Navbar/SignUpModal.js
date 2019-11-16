import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SignUpForm from "../SignUp/SignUpForm";
const SignInModal = props => {
  return (
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>
          Sign Up
          <Button className="close--modal" onClick={props.handleClose}>
            X
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignUpForm />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SignInModal;
