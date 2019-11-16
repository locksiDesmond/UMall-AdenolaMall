import React from "react";
import logo from "./../../images/umall2.gif";
import SignInForm from "./SignInForm";
import { Link } from "react-router-dom";
function SignIn() {
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

          <SignInForm />
        </div>
      </section>
    </section>
  );
}

export default SignIn;
