import React from "react";
import Modal from "react-bootstrap/Modal";
import SignInForm from "../SignIn/SignInForm";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "./../../images/umall2.gif";

const SignInModal = props => {
  return (
    <Modal show={props.show}>
      \{" "}
      <Modal.Body>
        <section className="signin--body">
          <div className="logo--group--with--text">
            <Link to={{ pathname: "/" }}>
              <img alt="Logo" src={logo} />
              <p>Sell swiftly, buy Swiftly</p>
            </Link>
            <SignInForm onClick={props.handleClose} />
          </div>
          <Button onClick={props.handleClose}>Close</Button>
        </section>
      </Modal.Body>
    </Modal>
  );
};
export default SignInModal;
