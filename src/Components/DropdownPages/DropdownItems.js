import React, { useState } from "react";
import Newdata from "./FetchData";
import ProductCard from "../ProductCard/index";
import Loading from "../../SmallComponent/Loading";
import ButtonLg from "./../../SmallComponent/ButtonLg";

function DropdownItems(props) {
  let state = props.location.state;
  const [more, setMore] = useState(2);
  const data = Newdata(state.category, state.title, more);
  const products = (
    <div className="products">
      {data !== "error" &&
        data.map(item => <ProductCard key={item.date} data={item} />)}
    </div>
  );
  return (
    <div className="main--content">
      {data[0] === "loading" ? (
        <Loading />
      ) : data.length === 0 ? (
        <p> no data found</p>
      ) : (
        products
      )}
      {data.length === 0 && <p>No item found</p>}

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
  );
}
export default DropdownItems;
