import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SignUpForm from "../SignUp/SignUpForm";
import Btn from "./../../SmallComponent/Btn";
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
        <section className="signin--section signup">
          <div className="signin--body">
            <div className="logo--group--with--text">
              <Link to={{ pathname: "/" }}>
                <img alt="Logo" src={logo} />
                <p>Sell swiftly, buy Swiftly</p>
              </Link>
            </div>
            <SignUpForm firebase={props.firebase} onClick={props.handleClose} />
          </div>
          <div className="signin--link">
            <p>
              Dont have an account
              <span style={{ color: "#05aff2", marginRight: "1rem" }}> ? </span>
              <Link to={{ pathname: "/signIn" }}>
                <Btn color="#05aff2" title="Log in" />
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
        </section>
      </Modal.Body>
    </Modal>
  );
};
export default SignInModal;
