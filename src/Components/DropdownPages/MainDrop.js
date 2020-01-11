import React, { useState, useEffect } from "react";
import { CategoryData } from "./FetchData";
import Btn from "./../../SmallComponent/Btn";
import ProductCard from "./../ProductCard/index";
import { Link } from "react-router-dom";
import Loading from "../../SmallComponent/Loading";
import ButtonLg from "./../../SmallComponent/ButtonLg";

import { PostItems } from "./DropdownItems";
function MainDrop(props) {
  let category = props.state || props.location.state;
  const [more, setMore] = useState(10);
  const data = CategoryData(category, more);
  const [bgimage, setImage] = useState("");
  const [dropdown, setDropdown] = useState(true);
  const products = data.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  useEffect(() => {
    setTimeout(() => {
      setDropdown(false);
    }, 9500);
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
      case "Household items":
        setImage(
          "https://cdn2.vectorstock.com/i/1000x1000/11/51/household-appliances-icons-set-vector-751151.jpg"
        );
        break;
      case "Others":
        setImage(
          "https://www.shopise.com/wp-content/uploads/ngg_featured/Tips-to-sell-your-property-fast-and-easy.jpg"
        );
        break;
      default:
        setImage("a");
    }
  }, [category]);
  return (
    <React.Fragment>
      <div className="main--content main">
        {props.authenticated && PostItems}
        <div
          className={`image--div ${category}`}
          style={{
            backgroundImage: `url(${bgimage})`,
            color: category === "Devices" ? "#000" : "#05aff2"
          }}
        ></div>
        <div className="absolute">
          <div>
            <p>Want to </p>
            <p>
              Buy <span style={{ color: "#f4754e" }}>?</span>
            </p>
            <a href="#down">
              <Btn
                dropdown={dropdown ? "true" : undefined}
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
            {props.authenticated ? (
              <Link to={{ pathname: "/umall/post" }}>
                <Btn className="big" color="#05aff2" title="Post" />
              </Link>
            ) : (
              <Link to={{ pathname: "/signUp" }}>
                <Btn className="big" color="#05aff2" title="Sign up" />
              </Link>
            )}
          </div>
        </div>

        <div className="main--body" id="down">
          <p>Trends</p>
          <div className="products">
            {data[0] === "loading" ? (
              <div>
                <Loading className="products loading" />
              </div>
            ) : (
              products
            )}
            {data.length === 0 && <p>No item found</p>}
          </div>
        </div>
        {data.length > more - 1 && (
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
        )}
      </div>
    </React.Fragment>
  );
}
export default MainDrop;
