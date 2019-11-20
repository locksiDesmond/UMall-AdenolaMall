import React, { useState } from "react";

function Descriptionbody(props) {
  const [show, setShow] = useState(false);
  const { items } = props;
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="description--page">
      <div className="product--description">
        <h1> Title</h1>
        <img
          className="description--image"
          src={items.pictureUrl}
          alt=" product"
        />
        <span className="date">Date</span>
        <h2>Description</h2>
        <p className="description--details">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam,
          voluptas officiis? Eius impedit delectus saepe quibusdam rem corporis
          modi cupiditate laboriosam debitis sequi velit commodi, omnis aut quae
          quam voluptatibus?
        </p>
      </div>
      <div className="description--aside">
        <div className="product--owner-profile">
          <div className="profile-image-name">
            <img
              className="rounded-circle product--image"
              src={items.pictureUrl}
              alt="profile "
            />
            <h2> Owners Name</h2>
          </div>
          <ul className="details">
            <li>
              Last Seen: <span> 3 days ago</span>
            </li>
            <li>
              Joined <span> </span>
            </li>
            <li>
              Material posted<span> </span>
            </li>
            <li>
              Sold <span>20 </span>
            </li>
          </ul>
          <div className=" show--number-parent">
            <button className="btn show--number" onClick={handleShow}>
              Show Number
            </button>
            {show && <div style={{ marginTop: "1rem" }}> Number Demo</div>}
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
