import React from "react";
import Modal from "react-bootstrap/Modal";
import { firebase } from "./../../Firebase/Firebase";
import Button from "react-bootstrap/Button";
const LogOutModal = props => {
  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .catch(error => {
        console.log("error");
      });
  };
  return (
    <Modal show={props.show} size="sm">
      <Modal.Body>
        <p style={{ textAlign: "center" }}>Are you sure you want to log out</p>
        <div
          style={{
            margin: "1.5rem 3rem .6rem 3rem",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Button onClick={Logout}> Logout</Button>
          <Button onClick={props.handleClose}> Close</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default LogOutModal;
