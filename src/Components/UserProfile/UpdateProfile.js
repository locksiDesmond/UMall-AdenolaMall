import React, { useState, useEffect } from "react";
import ImageUpload from "./../Upload/ImageUpload";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Userdata } from "../DropdownPages/FetchData";
import ButtonLg from "./../../SmallComponent/ButtonLg";
import Profile from "./Profile";
import { ContextCreator } from "./../../Context/Context";

const UpdateProfile = props => {
  let userdata = Userdata(props.user.uid);
  const [displayName, setDisplayName] = useState({
    name: props.user.displayName,
    error: ""
  });
  const [phoneNumber, setPhoneNumber] = useState({
    name: userdata.phoneNumber,
    error: ""
  });
  useEffect(() => {
    if (phoneNumber.name === undefined) {
      setPhoneNumber({ name: userdata.phoneNumber });
    }
  }, [phoneNumber.name, userdata.phoneNumber]);
  const [photo, setPhoto] = useState();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (!(!displayName.name || !phoneNumber.name)) {
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
      if (phoneNumber.name.length !== 11) {
        setPhoneNumber({ error: "invalid Password" });
      }
      if (
        !(
          !photo ||
          photo === userdata.photoUrl ||
          phoneNumber.name.length !== 11
        )
      ) {
        const picture = props.firebase.st
          .ref(`userDp/${photo.name}`)
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
                .update({
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
    }
  };
  const downloadPicture = picture => {
    setPhoto(picture);
    setLoaded(true);
  };
  return (
    <React.Fragment>
      <div
        className=" d-block d-md-none profile"
        style={{ backgroundColor: "#02aff2" }}
      >
        <ContextCreator.Consumer>
          {({ user, firebase }) => <Profile firebase={firebase} user={user} />}
        </ContextCreator.Consumer>
      </div>
      <div className="d-block d-md-none">
        <p style={{ fontSize: "1rem", fontWeight: "500", marginLeft: ".6rem" }}>
          Update Profile
        </p>
      </div>
      <Form
        style={{ marginTop: "1rem" }}
        className="upload"
        onSubmit={handleSubmit}
      >
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
          <Form.Label className="signin-form-name">Phone Number</Form.Label>
          <Form.Control
            className={phoneNumber.error ? "input--error" : "input--control"}
            type="number"
            value={phoneNumber.name}
            name="phoneNumber"
            onChange={e => setPhoneNumber({ name: e.currentTarget.value })}
          />
        </Form.Group>
        <ImageUpload
          ratio="1"
          loaded={loaded}
          handleSubmit={downloadPicture}
          style={{ marginLeft: "0" }}
        />
        <div style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
          <ButtonLg
            loading={loading ? true : false}
            title="Save"
            small="true"
            onClick={handleSubmit}
          />
        </div>
        {progress && <ProgressBar now={progress} />}
        {error && <p>{error}</p>}
      </Form>
    </React.Fragment>
  );
};

export default UpdateProfile;
