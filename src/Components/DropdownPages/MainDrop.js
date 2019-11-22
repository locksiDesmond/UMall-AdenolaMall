import React, { useState, useEffect } from "react";
import { CategoryData } from "./FetchData";
import image from "../../images/blackwoman.jfif";
import Btn from "./../../SmallComponent/Btn";
import ProductCard from "./../ProductCard/index";
import { Link } from "react-router-dom";
import Loading from "../../SmallComponent/Loading";
// import { Spinner } from "react-bootstrap";

function MainDrop(props) {
  let category = props.location.state;
  const data = CategoryData(category);
  console.log(data[0] === "loading");
  const [bgimage, setImage] = useState("");
  const products = data.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  useEffect(() => {
    switch (category) {
      case "Devices":
        setImage("f");
        break;
      case "Clothings":
        setImage(image);
        break;
      case "Cosmetics":
        setImage("d");
        break;
      case "Household Items":
        setImage("c");
        break;
      case "others":
        setImage("b");
        break;
      default:
        setImage("a");
    }
  }, [category]);

  return (
    <div className="main--content main">
      <React.Fragment>
        <div
          className="image--div"
          style={{ backgroundImage: `url(${bgimage})` }}
        >
          <div>
            <p>Want to </p>
            <p>
              Buy <span style={{ color: "#f4754e" }}>?</span>
            </p>
            <Btn className="big" color="#f4754e" title="Shop now" />
          </div>
          <div>
            <p>Want to</p>
            <p>Sell</p>
            <Link to={{ pathname: "/signin" }}>
              <Btn className="big" color="#05aff2" title="Sign up" />
            </Link>
          </div>
        </div>
        <div className="main--body">
          <p>Trends</p>
          <div className="products">
            {data[0] === "loading" ? (
              <Loading className="products loading" />
            ) : (
              products
            )}
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}
export default MainDrop;
