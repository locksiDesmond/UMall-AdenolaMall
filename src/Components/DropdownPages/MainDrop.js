import React, { useState, useEffect } from "react";
import { CategoryData } from "./FetchData";
// import image from "../../images/blackwoman.jfif";
import Btn from "./../../SmallComponent/Btn";
import ProductCard from "./../ProductCard/index";
import { Link } from "react-router-dom";
import Loading from "../../SmallComponent/Loading";
// import { Spinner } from "react-bootstrap";

function MainDrop(props) {
  let category = props.location.state;
  const data = CategoryData(category);
  const [bgimage, setImage] = useState("");
  const products = data.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  useEffect(() => {
    switch (category) {
      case "Devices":
        setImage(
          "https://cdn.macrumors.com/article-new/2019/05/bestiphoneaccessoriesguide-800x434.jpg"
        );
        break;
      case "Clothings":
        setImage(
          "https://static3.bigstockphoto.com/6/5/2/large1500/256602442.jpg"
        );
        break;
      case "Cosmetics":
        setImage(
          "https://www.tsingapore.com/FileStorage/Article/Hotspot/Beauty/2018/11/ormaie1200.jpg"
        );
        break;
      case "Footwears":
        setImage(
          "https://assets.teenvogue.com/photos/5d489ca292a6b200094bdd2c/master/w_1600%2Cc_limit/Screen%252520Shot%2525202019-08-05%252520at%2525205.15.01%252520PM.png"
        );
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
          style={{
            backgroundImage: `url(${bgimage})`,
            color: category === "Devices" ? "#000" : "#05aff2"
          }}
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
