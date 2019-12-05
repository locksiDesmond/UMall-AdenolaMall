import React from "react";
import Modal from "react-bootstrap/Modal";
import SignInForm from "../SignIn/SignInForm";
import Button from "react-bootstrap/Button";
import Btn from "./../../SmallComponent/Btn";
import { Link } from "react-router-dom";
import logo from "./../../images/umall2.gif";

const SignInModal = props => {
  return (
    <Modal show={props.show}>
      <Modal.Body className="signin--section">
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
            <SignInForm firebase={props.firebase} onClick={props.handleClose} />
          </div>
        </section>
        <div className="signin--link">
          <p>
            Dont have an account
            <span style={{ color: "#05aff2", marginRight: "1rem" }}> ? </span>
            <Link to={{ pathname: "/signUp" }}>
              <Btn color="#05aff2" title="signup" />
            </Link>
          </p>
          <p>
            Forgot password <span style={{ color: "#05aff2" }}> ?</span>
            <Link to={{ pathname: "/reset" }}>
              <span style={{ paddingLeft: ".5rem", color: "#001992" }}>
                <em>click here</em>
              </span>
            </Link>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default SignInModal;
