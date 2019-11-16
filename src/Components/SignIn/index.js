import React from "react";
import logo from "./../../images/umall2.gif";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <section className="signin">
      <section className="signin--section">
        <section className="signin--body">
          <div className="logo--group--with--text">
            <Link to={{ pathname: "/" }}>
              <img alt="Logo" src={logo} />
              <p>Sell swiftly, buy Swiftly</p>
            </Link>
          </div>
          <SignUpForm />
        </section>
      </section>
    </section>
  );
}
export default SignUp;
