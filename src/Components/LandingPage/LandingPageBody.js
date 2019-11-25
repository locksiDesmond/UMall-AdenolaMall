import React from "react";
import { Link } from "react-router-dom";
import Btn from "./../../SmallComponent/Btn";

function LandingPageBody() {
  const bgimage =
    "https://sharemorestories.com/wp-content/uploads/qtq80-svx0G1.jpeg";
  // const products = data.map(item => (
  //   <ProductCard key={item.date} data={item} />
  // ));

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
          {/* <div className="products">
            {data[0] === "loading" ? (
              <Loading className="products loading" />
            ) : (
              products
            )}
          </div> */}
        </div>
      </React.Fragment>
    </div>
  );
}

export default LandingPageBody;
