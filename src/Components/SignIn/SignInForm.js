import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { firebase } from "./../../Firebase/Firebase";
import { Redirect } from "react-router-dom";
import ButtonLg from "../../SmallComponent/ButtonLg";

function SignInForm() {
  const [displayName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState("");
  const [loading, setLoading] = useState(false);
  const style = error ? "error" : "bg-ski";
  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (displayName === "" || displayName === null) {
      setError("!invalid DisplayName");
      return;
    } else if (password !== confirm) {
      setError("Passwords are not the same");
      return;
    } else if (!password) {
      setError("Enter password");
      return;
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          if (user) {
            setRedirect(true);
            user.diplayName = displayName;
          }
        })
        .catch(error => {
          if (error.code !== "auth/network-request-failed") {
            setError(error.message);
            setLoading(false);
          } else {
            setLoading(true);
          }
        });
      setName("");
      setPassword("");
      setConfirm("");
      setEmail("");
    }
  };

  return (
    <Form className="signinform" onSubmit={handleSubmit}>
      {redirect ? <Redirect to={{ pathname: "/protected/Home" }} /> : null}
      <Form.Group>
        <Form.Label className="signin-form-name">Display Name</Form.Label>
        <Form.Control
          value={displayName}
          onChange={e => {
            setName(e.currentTarget.value);
            setError(false);
          }}
          className={style}
          type="text"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="signin-form-name">Email</Form.Label>
        <Form.Control
          value={email}
          onChange={e => setEmail(e.currentTarget.value)}
          className="bg-ski"
          type="email"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="signin-form-name">Password</Form.Label>
        <Form.Control
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
          className="bg-ski"
          type="password"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="signin-form-name">Confirm Password</Form.Label>
        <Form.Control
          value={confirm}
          onChange={e => setConfirm(e.currentTarget.value)}
          className="bg-ski"
        />
      </Form.Group>
      <ButtonLg disable={loading && true} type="submit" title="submit" />

      {error && <Alert variant="danger">{error}</Alert>}
    </Form>
  );
}

export default SignInForm;
