import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SignUpForm from "../SignUp/SignUpForm";
import { Link } from "react-router-dom";
import logo from "./../../images/umall2.gif";
const SignInModal = props => {
  return (
    <Modal show={props.show}>
      <Modal.Body>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{ height: "2rem", fontSize: ".7rem", padding: ".5rem" }}
            onClick={props.handleClose}
          >
            X
          </Button>
        </div>

        <div className="signin--body">
          <div className="logo--group--with--text">
            <Link to={{ pathname: "/" }}>
              <img alt="Logo" src={logo} />
              <p>Sell swiftly, buy Swiftly</p>
            </Link>
          </div>
          <SignUpForm onClick={props.handleClose} />
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default SignInModal;
