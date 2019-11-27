import React from "react";
import Modal from "react-bootstrap/Modal";
import SignInForm from "../SignIn/SignInForm";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "./../../images/umall2.gif";

const SignInModal = props => {
  return (
    <Modal show={props.show}>
      <Modal.Body>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            style={{
              height: "2rem",
              backgroundColor: "#f4754e",
              outline: "none",
              border: "none",
              fontSize: ".7rem",
              padding: ".5rem"
            }}
            onClick={props.handleClose}
          >
            X
          </Button>
        </div>
        <section className="signin--body">
          <div className="logo--group--with--text">
            <Link to={{ pathname: "/" }}>
              <img alt="Logo" src={logo} />
              <p>Sell swiftly, buy Swiftly</p>
            </Link>
            <SignInForm onClick={props.handleClose} />
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
};
export default SignInModal;
