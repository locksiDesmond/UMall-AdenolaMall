import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Btn from "./../../SmallComponent/Btn";
import Spinner from "react-bootstrap/Spinner";
import ProductCard from "../ProductCard";
import { LandingPageData } from "../DropdownPages/FetchData";

import { PostItems } from "./../DropdownPages/DropdownItems";
function LandingPageBody({ location, user, authenticated, firebase }) {
  const [welcome, setWelcome] = useState("");
  const [dropdown, setDropdown] = useState(true);
  const bgimage =
    "https://sharemorestories.com/wp-content/uploads/qtq80-svx0G1.jpeg";
  const devices = LandingPageData("Devices", "name", 4);
  const Devices = devices.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  const cosmetics = LandingPageData("Cosmetics", "name", 4);
  const Cosmetics = cosmetics.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  const footwears = LandingPageData("Footwears", "name", 4);
  const Footwears = footwears.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  const clothings = LandingPageData("Clothings", "name", 4);
  const Clothings = clothings.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  const household = LandingPageData("Household items", "name", 4);
  const Household = household.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  useEffect(() => {
    setTimeout(() => {
      setDropdown(false);
    }, 9500);
    if (authenticated) {
      const created = new Date(user.metadata.creationTime);
      const last = new Date(user.metadata.lastSignInTime);
      const url =
        "https://firebasestorage.googleapis.com/v0/b/umall-adenola-mall-production.appspot.com/o/Defaultphoto%2Fboy.svg?alt=media&token=82509f3a-3d6c-42aa-8f35-2b60aed21209";
      if (last - created === 0 && location) {
        const { phoneNumber, displayName } = location;
        const metadata = { ...user.metadata };
        firebase.store
          .collection("Users")
          .doc(user.uid)
          .set({
            username: displayName.name,
            phoneNumber: phoneNumber.name,
            photoUrl: url,
            metadata: metadata,
            materialPosted: 0,
            materialSold: 0
          });
        setWelcome("You are Welcomed to umall");

        const phone = location;
        console.log(phone);
      }
    }
    // eslint-disable-next-line
  }, [authenticated]);
  const Loading = (
    <Spinner
      as="span"
      animation="border"
      size="lg"
      role="status"
      aria-hidden="true"
      style={{ color: "#f4754e" }}
    />
  );
  return (
    <div className="main--content main">
      {authenticated && PostItems}
      {welcome && (
        <Alert
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#f4754e",
            width: "78%",
            margin: "1rem 1.5rem"
          }}
          onClose={() => setWelcome("")}
          dismissible
        >
          {welcome}
        </Alert>
      )}
      <React.Fragment>
        <div
          className="image--div"
          style={{
            backgroundImage: `url(${bgimage})`,
            color: "#f4754e",
            textShadow: " 1px 1px 2px #f4754e"
          }}
        ></div>
        <div className="absolute" style={{ color: "#fff" }}>
          <div>
            <p>Want to </p>
            <p>
              Buy <span style={{ color: "#f4754e" }}>?</span>
            </p>
            <a href="#down">
              <Btn
                dropdown={dropdown && "true"}
                className="big"
                color="#f4754e"
                title="Shop now"
              />
            </a>
          </div>
          <div>
            <p>Want to</p>
            <p>
              Sell <span style={{ color: "#05aff2" }}>?</span>
            </p>
            {authenticated ? (
              <Link to={{ pathname: "/umall/Post" }}>
                <Btn className="big" color="#05aff2" title="Post" />
              </Link>
            ) : (
              <Link to={{ pathname: "/signUp" }}>
                <Btn className="big" color="#05aff2" title="Sign up" />
              </Link>
            )}
          </div>
        </div>
        <div className="main--body" id="section">
          <div id="down" className="trends">
            <p>Trends in Devices</p>
            <div className="products">
              {devices[0] === "loading" ? <p>{Loading}</p> : Devices}
              {devices.length === 0 && <p>No item found</p>}
            </div>
          </div>
          <div className="trends">
            <p>Trends in Clothings</p>
            <div className="products">
              {clothings[0] === "loading" ? <p>{Loading}</p> : Clothings}
              {clothings.length === 0 && <p>No item found</p>}
            </div>
          </div>
          <div className="trends">
            <p>Trends in FootWears</p>
            <div className="products">
              {footwears[0] === "loading" ? <p>{Loading}</p> : Footwears}
              {footwears.length === 0 && <p>No item found</p>}
            </div>
          </div>
          <div className="trends">
            <p>Trends in Household Appliances</p>
            <div className="products">
              {household[0] === "loading" ? <p>{Loading}</p> : Household}
              {household.length === 0 && <p>No item found</p>}
            </div>
          </div>
          <div className="trends">
            <p>Trends in Cosmetics</p>
            <div className="products">
              {cosmetics[0] === "loading" ? <p>{Loading}</p> : Cosmetics}
              {cosmetics.length === 0 && <p>No item found</p>}
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default LandingPageBody;
