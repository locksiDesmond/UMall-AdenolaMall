import React from "react";
import { Link } from "react-router-dom";
import Btn from "./../../SmallComponent/Btn";
import ProductCard from "../ProductCard";
import { LandingPageData } from "../DropdownPages/FetchData";

function LandingPageBody({ authenticated }) {
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
  return (
    <div className="main--content main">
      <React.Fragment>
        <div
          className="image--div"
          style={{ backgroundImage: `url(${bgimage})`, color: "#fff" }}
        >
          <div>
            <p>Want to </p>
            <p>
              Buy <span style={{ color: "#f4754e" }}>?</span>
            </p>
            <a href="#section">
              <Btn
                dropdown="true"
                className="big"
                color="#f4754e"
                title="Shop now"
              />
            </a>
          </div>
          <div>
            <p>Want to</p>
            <p>Sell</p>
            {authenticated ? (
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
        <div className="main--body" id="section">
          <p>Trends</p>
          <div className="">
            <p>Trends in Devices</p>
            <div className="products">
              {devices[0] === "loading" ? <p>loading</p> : Devices}
            </div>
          </div>
          <div className="">
            <p>Trends in Clothings</p>
            <div className="products">
              {clothings[0] === "loading" ? <p>loading</p> : Clothings}
            </div>
          </div>
          <div className="">
            <p>Trends in FootWears</p>
            <div className="products">
              {footwears[0] === "loading" ? <p>loading</p> : Footwears}
            </div>
          </div>
          <div className="">
            <p>Trends in Household Appliances</p>
            <div className="products">
              {household[0] === "loading" ? <p>loading</p> : Household}
            </div>
          </div>
          <div className="">
            <p>Trends in Cosmetics</p>
            <div className="products">
              {cosmetics[0] === "loading" ? <p>loading</p> : Cosmetics}
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default LandingPageBody;
