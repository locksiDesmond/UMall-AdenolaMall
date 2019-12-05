import React from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
// import { firebase } from "../../Firebase/Firebase";
import { Redirect, Link } from "react-router-dom";
import ButtonLg from "../../SmallComponent/ButtonLg";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: { name: "", error: "" },
      password: { name: "", error: "" },
      phoneNumber: { name: "", error: "" },
      email: { name: "", error: "" },
      confirm: { name: "", error: "" },
      error: "",
      loading: false,
      redirect: false,
      check: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
  }
  toggleCheck() {
    this.setState({ check: !this.state.check });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { displayName, password, confirm, email, phoneNumber } = this.state;
    this.setState({ loading: true });
    if (!displayName.name) {
      this.setState({ displayName: { error: "invalid display name" } });
    }
    if (!phoneNumber.name) {
      this.setState({ phoneNumber: { error: "enter Phone Number" } });
    }
    if (password.name !== confirm.name) {
      this.setState({ confirm: { error: "Passwords are not the same" } });
    }
    if (!this.state.check) {
      this.setState({ error: "form not completed" });
    }
    if (password.name.length < 6) {
      this.setState({
        password: {
          error: "passwords should be atleast 6 characters "
        }
      });
    }
    if (!password.name) {
      this.setState({ password: { error: "No password" } });
    }
    if (!email.name) {
      this.setState({ email: { error: "no Email" } });
    }
    if (phoneNumber.name.length !== 11) {
      this.setState({ phoneNumber: { error: "phone number not correct" } });
    }
    if (
      !(
        !password.name ||
        !email.name ||
        password.name !== confirm.name ||
        !phoneNumber.name ||
        password.name.length < 6 ||
        phoneNumber.name.length !== 11 ||
        !this.state.check
      )
    ) {
      this.setState({ loading: true });
      this.props.firebase.auth
        .createUserWithEmailAndPassword(email.name, password.name)
        .then(user => {
          if (this.props.onClick) {
            this.props.onClick();
          }
          this.setState({
            password: { name: "" },
            confirm: { name: "" },
            email: { name: "" },
            loading: false,
            redirect: true
          });
          const setdisplayName = this.props.firebase.auth.currentUser;
          setdisplayName
            .updateProfile({
              displayName: this.state.displayName.name
            })
            .then(() => {
              console.log("successful");
            });
        })
        .catch(error => {
          if (error.code !== "auth/network-request-failed") {
            this.setState({ error: error.message, loading: false });
            console.log(error.message);
          } else {
            this.setState({ error: "no Internet connection", loading: false });
          }
        });
    }
    this.setState({
      loading: false
    });
  }
  handleChange(e) {
    let value = e.target.name;
    this.setState({
      [value]: { name: e.target.value }
    });
  }

  render() {
    const {
      displayName,
      password,
      confirm,
      error,
      email,
      redirect,
      loading,
      phoneNumber,
      check
    } = this.state;
    return (
      <Form className="signinform" onSubmit={this.handleSubmit}>
        {redirect && (
          <Redirect to={{ pathname: "/", state: { ...this.state } }} />
        )}

        <Form.Group>
          <Form.Label className="signin-form-name">Display Name</Form.Label>
          <Form.Control
            name="displayName"
            value={displayName.name}
            onChange={this.handleChange}
            className={displayName.error ? "input--error" : "input--control"}
            type="text"
          />
          {displayName.error && <p>{displayName.error}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label className="signin-form-name">Email</Form.Label>
          <Form.Control
            value={email.name}
            name="email"
            onChange={this.handleChange}
            className={email.error ? "input--error" : "input--control"}
            type="email"
          />
          {email.error && <p>{email.error}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label className="signin-form-name">phoneNumber</Form.Label>
          <Form.Control
            name="phoneNumber"
            type="Number"
            value={phoneNumber.name}
            onChange={this.handleChange}
            className={phoneNumber.error ? "input--error" : "input--control"}
          />
          {phoneNumber.error && <p>{phoneNumber.error}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label className="signin-form-name">Password</Form.Label>
          <Form.Control
            name="password"
            value={password.name}
            onChange={this.handleChange}
            className={password.error ? "input--error" : "input--control"}
            type="password"
          />
          {password.error && <p>{password.error}</p>}
        </Form.Group>
        <Form.Group>
          <Form.Label className="signin-form-name">Confirm Password</Form.Label>
          <Form.Control
            name="confirm"
            type="password"
            value={confirm.name}
            onChange={this.handleChange}
            className={confirm.error ? "input--error" : "input--control bgski"}
          />
          {confirm.error && <p>{confirm.error}</p>}
        </Form.Group>
        <Form.Group>
          <input
            onChange={this.toggleCheck}
            type="checkbox"
            defaultChecked={check}
          />

          <span style={{ paddingLeft: ".5rem" }}>
            yes, i have
            <Link to={{ pathname: "/TermsAndConditions" }}>
              <em style={{ marginLeft: ".3rem", color: "#001992" }}>read </em>
            </Link>
            and i accept Terms and Condition
          </span>
        </Form.Group>
        <ButtonLg
          small="true"
          disabled={loading}
          type="submit"
          title="submit"
          loading={loading}
          onClick={this.handleSubmit}
        />

        {error && (
          <Alert style={{ marginTop: "1rem" }} variant="danger">
            {error}
          </Alert>
        )}
      </Form>
    );
  }
}

export default SignUpForm;
