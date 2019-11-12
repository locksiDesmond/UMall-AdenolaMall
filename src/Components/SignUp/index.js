import React from "react";
import logo from "./../../images/umall2.gif";
import SignUpForm from "./SignUpForm";

function SignUp() {
  return (
    <section className="signin">
      <section className="signin--section">
        <section className="signup-body">
          <div className="logo--group--with--text">
            <img alt="Logo" src={logo} />
            <p>Sell swiftly, buy Swiftly</p>
          </div>
          <SignUpForm />
        </section>
      </section>
    </section>
  );
}
export default SignUp;
