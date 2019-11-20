import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { firebase } from "../../Firebase/Firebase";
import { Redirect } from "react-router-dom";
import ButtonLg from "../../SmallComponent/ButtonLg";
function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const style = error ? "input--error" : "input--control";
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      setError("No Email");
    }
    if (!password) {
      setError("No passWord");
    }
    if (!(!email || !password)) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          if (user) {
            setRedirect(true);
            setLoading(false);
          }
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
    setLoading(false);
  };
  return (
    <Form className="signupform" onSubmit={handleSubmit}>
      {redirect && <Redirect to={{ pathname: "/Home" }} />}
      <Form.Group>
        <Form.Label className="signin-form-name">Email</Form.Label>
        <Form.Control
          type="email"
          onChange={e => setEmail(e.currentTarget.value)}
          value={email}
          className={style}
        />
      </Form.Group>
      <Form.Group className="signin-form-name">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={e => setPassword(e.currentTarget.value)}
          value={password}
          className={style}
        />
      </Form.Group>
      <ButtonLg
        disabled={loading ? true : false}
        small="true"
        type="submit"
        title="submit"
      />

      {error ? (
        <Alert style={{ marginTop: "2rem" }} variant="danger">
          {error}
        </Alert>
      ) : null}
    </Form>
  );
}

export default SignInForm;
