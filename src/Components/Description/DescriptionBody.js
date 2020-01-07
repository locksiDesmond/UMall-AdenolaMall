import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { RelatedData } from "./../DropdownPages/FetchData";
import ProductCard from "./../ProductCard/index";
import Badge from "../../SmallComponent/Badge";
import { IoIosHeart } from "react-icons/io";
import { IoMdCall } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
export function OwnersDetails({ userdata, items }) {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  const getWhatappLink = () => {
    window.open(
      "https://api.whatsapp.com/send?phone=" +
        "+234" +
        userdata.phoneNumber.slice(1) +
        "&text=%20" +
        "i saw your product on Umall "
    );
  };

  return (
    <div className="product--owner-profile">
      <p
        style={{
          textAlign: "center",
          fontWeight: "500",
          fontSize: "1.1rem"
        }}
      >
        Seller's details
      </p>
      <div className="profile-image-name block-center">
        <img
          className="rounded-circle product--image"
          src={userdata.photoUrl}
          alt="profile "
        />

        <p
          style={{ fontSize: "1.1rem", width: "7rem", fontWeight: "500" }}
          className="capitalize"
        >
          {userdata.username}
        </p>
      </div>
      <ul className="details">
        <li className="signin-form-name">
          Last Seen :
          <span>{userdata.metadata.lastSignInTime.slice(5, 16)}</span>
        </li>
        <li className="signin-form-name">
          Joined :<span>{userdata.metadata.creationTime.slice(5, 16)}</span>
        </li>
        <li className="signin-form-name">
          Material posted :
          <Badge padding="true" color="blue" title={userdata.materialPosted} />
        </li>
        <p className="signin-form-name">
          Sold :
          <Badge padding="true" color="Green" title={userdata.materialSold} />
        </p>
      </ul>
      <div className=" show--number-parent">
        <button className="btn show--number" onClick={handleShow}>
          {show ? <span>Hide </span> : <span>Show </span>}Number
        </button>
        {show && (
          <React.Fragment>
            <div
              onClick={e => {
                e.stopPropagation();
                window.open("tel:" + userdata.phoneNumber);
              }}
              style={{
                cursor: "pointer",
                marginTop: "1.2rem",
                fontWeight: "500"
              }}
            >
              <IoMdCall style={{ color: "blue", marginRight: ".6rem" }} />
              {userdata.phoneNumber}
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={e => {
                e.stopPropagation();
                getWhatappLink();
              }}
            >
              <FaWhatsapp color="green" />
              <span style={{ fontWeight: "500" }}>Chat on Whatapp</span>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
function Descriptionbody({
  items,
  userdata,
  likes,
  liked,
  handleclick,
  handlerefresh
}) {
  const [number, setNumber] = useState(0);
  const [direction, setDirection] = useState(null);
  let item = RelatedData(items.category, items.name, items.doc);
  const Otheritem = item.map(item => (
    <ProductCard handlerefresh={handlerefresh} data={item} key={item.date} />
  ));
  const handleSelect = (selectedIndex, e) => {
    setNumber(selectedIndex);
    setDirection(e.direction);
  };
  return (
    <div className="description--page">
      <div className="product--description">
        <h1 className="capitalize">{items.name}</h1>
        <div className="carousel--image ">
          <div className="first d-none d-md-block"></div>
          <Carousel
            className="second"
            fade="true"
            nextIcon={
              <span
                aria-hidden="true"
                style={{ backgroundColor: "#05aff2" }}
                className=" carousel-control-next-icon"
              />
            }
            prevIcon={
              <span
                aria-hidden="true"
                style={{ backgroundColor: "#05aff2" }}
                className=" carousel-control-prev-icon"
              />
            }
            activeIndex={number}
            direction={direction}
            onSelect={handleSelect}
          >
            {items.pictureUrl.map((item, index) => (
              <Carousel.Item key={index}>
                <img
                  className="description--image"
                  src={item}
                  alt={` ${index} product`}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="last d-none d-md-block"></div>
        </div>

        <span className="date">{items.data}</span>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Description</h2>
          <div className="icons">
            <span
              className="heart"
              style={{ marginRight: "1rem" }}
              onClick={() => {
                handleclick();
              }}
            >
              {liked ? (
                <IoIosHeart style={{ color: "red" }} />
              ) : (
                <FaRegHeart style={{ fill: "black" }} />
              )}
              <span style={{ fontSize: ".7rem" }}>
                {likes ? (likes.length === 0 ? " " : likes.length) : ""}
              </span>
            </span>
            <span className="price">&#8358;{items.price}</span>
          </div>
        </div>

        <div className="description--details">
          <p>
            {items.condition === "New" && (
              <span className="signin-form-name">"Brand New"</span>
            )}
          </p>
          <p>{items.description}</p>
        </div>
        <div className="products-d-none d-white">
          <p style={{ fontWeight: "500", fontSize: "1.2rem" }}>Related Items</p>
          <div className="products ">
            {item[0] === "loading" ? <p>loading</p> : Otheritem}
          </div>
        </div>
      </div>
      <div className="description--aside">
        <OwnersDetails userdata={userdata} items={items} />
        <div className="contactus warnings">
          <h3>
            <strong>Report And Warnings</strong>
          </h3>
          <p>
            Be sure to verify by any means available to you, the other party's
            identity
          </p>
          <h3>
            <strong>Advise</strong>
          </h3>
          <ul>
            <li>
              We strongly advise you meet in public places for exchange of
              goods.
            </li>
            <li>
              Always test your products before you pay, as we will not be held
              responsible for any scam.
            </li>
          </ul>
        </div>
        <div className="d-white products-d-block">
          <p style={{ fontWeight: "500", fontSize: "1.2rem" }}>Related Items</p>
          <div className="products ">
            {item[0] === "loading" ? <p>loading</p> : Otheritem}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Descriptionbody;
