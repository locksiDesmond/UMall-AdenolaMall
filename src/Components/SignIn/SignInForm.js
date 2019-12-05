import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
// import { firebase } from "../../Firebase/Firebase";
import { Redirect } from "react-router-dom";
import ButtonLg from "../../SmallComponent/ButtonLg";
function SignInForm(props) {
  const [email, setEmail] = useState({ name: "", password: "" });
  const [password, setPassword] = useState({ name: "", password: "" });
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (!email.name) {
      setEmail({ error: "no Email" });
      setLoading(false);
    }
    if (!password.name) {
      setPassword({ error: "No password" });
      setLoading(false);
    }
    if (password.name.length < 6) {
      setPassword({ error: "Password must be at least 6 chaaracters" });
      setLoading(false);
    }
    if (!(!email.name || !password.name || password.name.length < 6)) {
      props.firebase.auth
        .signInWithEmailAndPassword(email.name, password.name)
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
  };
  return (
    <Form className="signupform" onSubmit={handleSubmit}>
      {redirect && <Redirect to={{ pathname: "/" }} />}
      <Form.Group>
        <Form.Label className="signin-form-name">Email</Form.Label>
        <Form.Control
          type="email"
          onChange={e => setEmail({ name: e.currentTarget.value })}
          value={email.name}
          className={email.error ? "input--error" : "input--control"}
        />
        {email.error && <p style={{ color: "#f00" }}>{email.error}</p>}
      </Form.Group>
      <Form.Group className="signin-form-name">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          onChange={e => setPassword({ name: e.currentTarget.value })}
          value={password.name}
          className={password.error ? "input--error" : "input--control"}
        />
        {password.error && <p style={{ color: "#f00" }}>{password.error}</p>}
      </Form.Group>
      <ButtonLg
        disabled={loading ? "true" : ""}
        loading={loading ? "true" : ""}
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
