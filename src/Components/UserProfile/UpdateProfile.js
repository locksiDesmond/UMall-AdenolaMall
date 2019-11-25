import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ImageUpload from "./../Upload/ImageUpload";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";

const UpdateProfile = props => {
  const [displayName, setDisplayName] = useState({ name: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ name: "", error: "" });
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (!!displayName.name || !phoneNumber.name) {
      if (displayName !== props.user.displayName) {
        const newUpdate = props.firebase.auth.currentUser;
        newUpdate
          .updateProfile({
            displayName: displayName.name
          })
          .then(() => {
            console.log("successful");
          })
          .catch(error => {
            console.log(error.message);
          });
      }
      if (phoneNumber !== props.user.phoneNumber) {
        const picture = props.firebase.st
          .ref()
          .child(props.user.uid)
          .put(photo);
        picture.on(
          "state_changed",
          snapshot => {
            const progre =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progre);
          },
          error => {
            console.log("error");
            setError(error.message);
            setLoading(false);
          },
          () => {
            picture.snapshot.ref.getDownloadURL().then(downloadUrl => {
              setProgress("");
              props.firebase.store
                .collection("Users")
                .doc(props.user.uid)
                .set({
                  username: displayName.name,
                  phoneNumber: phoneNumber.name,
                  photoUrl: downloadUrl
                })
                .then(() => {
                  setPhoneNumber("");
                  setDisplayName("");
                  setPhoto("");
                  setLoading(false);
                  console.log("successful");
                });
            });
          }
        );
      }

      // if(photo){
      //   const newUpdate = props.firebase.auth.currentUser
      //     newUpdate.UpdateProfile({
      //       phoneNumber:photoUrl
      //     }).then(()=>{
      //       console.log("successful")
      //     })
      // }
    }
  };
  const downloadPicture = picture => {
    setPhoto(picture);
    setLoaded(true);
  };
  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
        {progress && <ProgressBar now={progress} />}

        <Form.Group>
          <Form.Label className="signin-form-name">Display Name</Form.Label>
          <Form.Control
            className={displayName.error ? "input--error" : "input--control"}
            value={displayName.name}
            name="displayName"
            onChange={e => setDisplayName({ name: e.currentTarget.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            className={phoneNumber.error ? "input--error" : "input--control"}
            type="number"
            value={phoneNumber.name}
            name="phoneNumber"
            placeholder="0**********"
            onChange={e => setPhoneNumber({ name: e.currentTarget.value })}
          />
        </Form.Group>
        <ImageUpload ratio="1" loaded={loaded} handleSubmit={downloadPicture} />
        <Button disabled={loading} type="submit">
          Save Changes
        </Button>
        {error && <p>{error}</p>}
      </Form>
    </React.Fragment>
  );
};

export default UpdateProfile;
