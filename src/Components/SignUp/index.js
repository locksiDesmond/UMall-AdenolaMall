import React from "react";
import logo from "./../../images/umall2.gif";
import { Link } from "react-router-dom";
import SignUpForm from "../SignUp/SignUpForm";
function SignUp() {
  return (
    <section className="signin">
      <section className="signin--section">
        <div className="signin--body">
          <div className="logo--group--with--text">
            <Link to={{ pathname: "/" }}>
              <img alt="Logo" src={logo} />
              <p>Sell swiftly, buy Swiftly</p>
            </Link>
          </div>
          <SignUpForm />
        </div>
      </section>
    </section>
  );
}

export default SignUp;
