import React, { useState } from "react";
import ButtonLg from "./../../SmallComponent/ButtonLg";
import logo from "./../../images/umall2.gif";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function ForgotPassword(props) {
  const [email, setEmail] = useState({ name: "", error: "" });
  const [loading, setLoading] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (!email.name) {
      setEmail({ error: "invalid Email" });
    }
    if (email.name) {
      props.firebase.auth
        .sendPasswordResetEmail(email.name)
        .then(() => {
          console.log("succesful");
          setLoading(false);
        })
        .catch(error => {
          console.log(error.code);
        });
    }
    setLoading(false);
  };
  return (
    <section className="signin">
      <section className="signin--section  reset">
        <section className="signin--body">
          <div className="logo--group--with--text">
            <Link to={{ pathname: "/" }}>
              <img alt="Logo" src={logo} />
              <p>Sell swiftly, buy Swiftly</p>
            </Link>
          </div>
          <Form className="signupform" onSubmit={handleSubmit}>
            <p>
              Enter your email and the reset link will be send to your Email
            </p>

            <Form.Group>
              <Form.Label className="signin-form-name">Email</Form.Label>
              <Form.Control
                className={email.error ? "input--error" : "input--control"}
                type="email"
                onChange={e => {
                  setEmail({ name: e.currentTarget.value });
                }}
                name="email"
                value={email.name}
              />
            </Form.Group>
            <ButtonLg
              sm="true"
              disabled={loading ? "true" : ""}
              loading={loading ? "true" : ""}
              type="submit"
              onClick={handleSubmit}
              title="Reset"
            />
          </Form>
        </section>
      </section>
    </section>
  );
}
export default ForgotPassword;
