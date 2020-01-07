import React, { useState } from "react";
import Newdata from "./FetchData";
import ProductCard from "../ProductCard/index";
import Loading from "../../SmallComponent/Loading";
import ButtonLg from "./../../SmallComponent/ButtonLg";
import { Link } from "react-router-dom";
import { IoMdShareAlt } from "react-icons/io";
export const PostItems = (
  <Link to={{ pathname: "/umall/post" }}>
    <span className="d-block d-md-none post">
      <IoMdShareAlt />
      Post
    </span>
  </Link>
);

function DropdownItems(props) {
  let state = props.location.state;
  const [more, setMore] = useState(10);
  const data = Newdata(state.category, state.title, more);
  const products = (
    <React.Fragment>
      <h1>{data.subcategory} </h1>
      <div className="products">
        {data !== "error" &&
          data.map(item => <ProductCard key={item.date} data={item} />)}
      </div>
    </React.Fragment>
  );
  return (
    <div className="main--content">
      {data[0] === "loading" ? (
        <Loading />
      ) : data.length === 0 ? (
        <p className="empty" style={{ marginBottom: "2rem" }}>
          no data found
        </p>
      ) : (
        products
      )}
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
            onClick={() => setMore(more + 5)}
          />
        </div>
      )}
    </div>
  );
}
export default DropdownItems;
