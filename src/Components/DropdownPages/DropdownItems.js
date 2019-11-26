import React from "react";
import Newdata from "./FetchData";
import ProductCard from "../ProductCard/index";
import Loading from "../../SmallComponent/Loading";

function DropdownItems(props) {
  let state = props.location.state;
  const datas = Newdata(state.category, state.title);
  const products = (
    <div className="products">
      {datas !== "error" &&
        datas.map(item => <ProductCard key={item.date} data={item} />)}
    </div>
  );
  return (
    <div className="main--content">
      {datas[0] === "loading" ? (
        <Loading />
      ) : datas.length === 0 ? (
        <p> no data found</p>
      ) : (
        products
      )}
    </div>
  );
}
export default DropdownItems;
