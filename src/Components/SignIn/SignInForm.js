import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import firebase from "./../../Firebase/Firebase";

function SignInForm() {
  const [displayName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const style = error ? "error" : "bg-ski";

  const handleSubmit = e => {
    e.preventDefault();
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
      //   Fire.signUp(email, password).catch(error => {
      //     setError(error.message);
      //   });
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => {
          setError(error.message);
        });
      setName("");
      setPassword("");
      setConfirm("");
      setEmail("");
    }
  };

  return (
    <Form className="signinform" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label className="signin-form-name">Display Name</Form.Label>
        <Form.Control
          value={displayName}
          onChange={e => setName(e.currentTarget.value)}
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
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default SignInForm;
