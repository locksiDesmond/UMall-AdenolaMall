import React, { useState, useEffect } from "react";
import { CategoryData } from "./FetchData";
import Btn from "./../../SmallComponent/Btn";
import ProductCard from "./../ProductCard/index";
import { Link } from "react-router-dom";
import Loading from "../../SmallComponent/Loading";
import ButtonLg from "./../../SmallComponent/ButtonLg";

function MainDrop(props) {
  let category = props.state || props.location.state;
  const [more, setMore] = useState(2);
  const data = CategoryData(category, more);
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
    <React.Fragment>
      <div className="main--content main">
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
            {props.authenticated ? (
              <Link to={{ pathname: "/home/upload" }}>
                <Btn className="big" color="#05aff2" title="Post" />
              </Link>
            ) : (
              <Link to={{ pathname: "/signin" }}>
                <Btn className="big" color="#05aff2" title="Sign up" />
              </Link>
            )}
          </div>
        </div>
        <div className="main--body">
          <p>Trends</p>
          <div className="products">
            {data[0] === "loading" ? (
              <div style={{ marginLeft: "47%" }}>
                <Loading className="products loading" />
              </div>
            ) : (
              products
            )}
            {data.length === 0 && <p>No item found</p>}
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            margin: ".5rem .1rem 1rem .1rem"
          }}
        >
          <ButtonLg
            disabled={data[0] === "loading" ? true : false}
            title="show more"
            onClick={() => setMore(more + 2)}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
export default MainDrop;
