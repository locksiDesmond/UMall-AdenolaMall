import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { RelatedData } from "./../DropdownPages/FetchData";
import ProductCard from "./../ProductCard/index";
import Badge from "../../SmallComponent/Badge";
import { MdFiberNew } from "react-icons/md";
import { IoIosHeart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

function Descriptionbody({ items, userdata, likes, liked, handleclick }) {
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState(0);
  const [direction, setDirection] = useState(null);
  let item = RelatedData(items.category, items.name, items.doc);
  const Otheritem = item.map(item => (
    <ProductCard data={item} key={item.date} />
  ));
  const handleSelect = (selectedIndex, e) => {
    setNumber(selectedIndex);
    setDirection(e.direction);
  };
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="description--page">
      <div className="product--description">
        <h1 className="capitalize">{items.name}</h1>
        <div className="carousel--image ">
          <div className="first"></div>
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
              <Carousel.Item key={item.date}>
                <img
                  className="description--image"
                  src={item}
                  alt={` ${index} product`}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="last"></div>
        </div>

        <span className="date">{items.data}</span>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Description</h2>
          <div className="icons">
            {items.condition === "New" && (
              <span>
                <MdFiberNew color="#f4754e" style={{ fontSize: "2rem" }} />
              </span>
            )}
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

        <p className="description--details">{items.description}</p>
        <div className="products-d-none d-white">
          <p style={{ fontWeight: "500", fontSize: "1.2rem" }}>Related Items</p>
          <div className="products ">
            {item[0] === "loading" ? <p>loading</p> : Otheritem}
          </div>
        </div>
      </div>
      <div className="description--aside">
        <div className="product--owner-profile">
          <p
            style={{
              textAlign: "center",
              fontWeight: "500",
              fontSize: "1.1rem"
            }}
          >
            Sellers details
          </p>
          <div className="profile-image-name block-center">
            <img
              className="rounded-circle product--image"
              src={userdata.photoUrl}
              alt="profile "
            />

            <p style={{fontSize:"1.1rem",width: "7rem", fontWeight:"500"}} className="capitalize"> {userdata.username}</p>
          </div>
          <ul className="details">
            <li className="signin-form-name">
              Last Seen :
              <span>{userdata.metadata.lastSignInTime.slice(5, 16)}</span>
            </li>
            <li className="signin-form-name">
              Joined :
              <span>{userdata.metadata.creationTime.slice(5, 16)}</span>
            </li>
            <li className="signin-form-name">
              Material posted : <Badge padding="true" color="blue" title={userdata.materialPosted}/>
            </li>
            <p className="signin-form-name">
              Sold : <Badge padding="true" color="Green" title={userdata.materialSold}/>
            </p>
          </ul>
          <div className=" show--number-parent">
            <button className="btn show--number" onClick={handleShow}>
              {show ? <span>Hide </span> : <span>Show </span>}Number
            </button>
            {show && (
              <div style={{ marginTop: "1.2rem", fontWeight: "500" }}>
                {userdata.phoneNumber}
              </div>
            )}
          </div>
        </div>

        <div className="warnings">
          <h3>Report And Warnings</h3>
          <p> bunch of reports</p>
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
