import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { firebase } from "./../../Firebase/Firebase";
import { Redirect } from "react-router-dom";
function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const style = error ? "error" : "bg-ski";
  const handleSubmit = e => {
    e.preventDefault();
    if (!email) {
      return;
    } else if (!password) {
      return;
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          if (user) {
            console.log(user);
            setRedirect(true);
          }
        })
        .catch(error => {
          setError(error.message);
        });
    }
  };
  return (
    <Form className="signupform" onSubmit={handleSubmit}>
      {redirect ? <Redirect to={{ pathname: "/protected/home" }} /> : null}
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          onChange={e => setEmail(e.currentTarget.value)}
          value={email}
          className={style}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={e => setPassword(e.currentTarget.value)}
          value={password}
          className={style}
        />
      </Form.Group>
      <Button type="submit">Submit</Button>
      {error ? <Alert variant="danger">{error}</Alert> : null}
    </Form>
  );
}

export default SignUpForm;
