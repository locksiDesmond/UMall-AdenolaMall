import React from "react";
import logo from "./../../images/umall2.gif";
import { Link } from "react-router-dom";
import SignInForm from "../SignIn/SignInForm";
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
          <SignInForm />
        </div>
      </section>
    </section>
  );
}

export default SignUp;
