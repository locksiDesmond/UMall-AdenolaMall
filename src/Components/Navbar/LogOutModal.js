import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const LogOutModal = props => {
  const Logout = () => {
    props.firebase.auth.signOut().catch(error => {
      console.log("error");
    });
    props.firebase.store
      .collection("Users")
      .doc(props.user.uid)
      .update({
        logout: Date.now()
      });
    props.handleClose();
  };
  return (
    <Modal show={props.show} size="sm">
      <Modal.Body>
        <p style={{ textAlign: "center" }}>
          Are you sure you want to log out ?
        </p>
        <div
          style={{
            margin: "1.5rem 3rem .6rem 3rem",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Button size="sm" onClick={Logout}>
            Yes
          </Button>
          <Button size="sm" onClick={props.handleClose}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default LogOutModal;
