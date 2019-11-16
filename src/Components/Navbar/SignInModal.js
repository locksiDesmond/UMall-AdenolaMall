import React from "react";
import Modal from "react-bootstrap/Modal";
import SignInForm from "../SignIn/SignInForm";
import Button from "react-bootstrap/Button";
const SignInModal = props => {
  return (
    <Modal show={props.show}>
      <Modal.Header>Sign Up</Modal.Header>
      <Modal.Body>
        <SignInForm />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default SignInModal;
