import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { RelatedData } from "./../DropdownPages/FetchData";
import ProductCard from "./../ProductCard/index";
import { IoIosHeart } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";

function Descriptionbody({ items, userdata,likes, liked, onclick}) {
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState(0);
  const [direction, setDirection] = useState(null);
  let item = RelatedData(items.category, items.name);
  const Otheritem = item.map(item => (
    <ProductCard data={item} key={item.date} />
  ));
  const handleSelect = (selectedIndex, e) => {
    setNumber(selectedIndex);
    setDirection(e.direction);
  };
  console.log(userdata);
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className="description--page">
      <div className="product--description">
        <h1>{items.name}</h1>
        <div className="carousel--image">
          <div className="first">boys</div>
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
              <Carousel.Item>
                <img
                  className="description--image"
                  src={item}
                  alt={` ${index} product`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="last">boys</div>
        </div>

        <span className="date">{items.data}</span>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Description</h2>
          <div className="icons">
            <span
              className="heart"
              style={{ marginRight: "1rem" }}
              onClick={() => {
                onclick();
                }}
                >
                {liked ? (
                <IoIosHeart style={{ color: "red" }} />
              ) : (
                <FaRegHeart style={{ fill: "black" }} />
              )}
              <span style={{ fontSize: ".7rem" }}>
                {likes
                  ? likes === 0
                    ? " "
                    : likes.length
                  : ""}
            </span>
            }
            </span>
            <span className="price">&#8358;{items.price}</span>
          </div>
        </div>

        <p className="description--details">{items.description}</p>
        <div className="products">
          {item[0] === "loading" ? <p>loading</p> : Otheritem}
        </div>
      </div>
      <div className="description--aside">
        <div className="product--owner-profile">
          <div className="profile-image-name block-center">
            <img
              className="rounded-circle product--image"
              src={userdata.photoUrl}
              alt="profile "
            />

            <h2 className="capitalize"> {userdata.username}</h2>
          </div>
          <ul className="details">
            <li className="signin-form-name">
              Last Seen :
              <span> {userdata.metadata.lastSignInTime.slice(5, 16)}</span>
            </li>
            <li className="signin-form-name">
              Joined :
              <span> {userdata.metadata.creationTime.slice(5, 16)}</span>
            </li>
            <li className="signin-form-name">
              Material posted : <span>{userdata.materialPosted} </span>
            </li>
            <li className="signin-form-name">
              Sold : <span>{userdata.materialSold}</span>
            </li>
          </ul>
          <div className=" show--number-parent">
            <button className="btn show--number" onClick={handleShow}>
              Show Number
            </button>
            {show && (
              <div style={{ marginTop: "1rem" }}> {userdata.phoneNumber}</div>
            )}
          </div>
        </div>
        <div className="warnings">
          <h3>Report And Warnings</h3>
          <p> bunch of reports</p>
        </div>
      </div>
    </div>
  );
}
export default Descriptionbody;
