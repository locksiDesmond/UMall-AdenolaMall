import React from "react";
import Newdata from "./FetchData";
import ProductCard from "./../ProductCard/index";
import Loading from "../../SmallComponent/Loading";

function Clothing(props) {
  let state = props.location.state;
  const datas = Newdata(state.category, state.title);
  const products = (
    <div className="products">
      {datas.map(item => (
        <ProductCard key={item.date} data={item} />
      ))}
    </div>
  );
  return (
    <div className="main--content">
      {datas.length === 0 ? <Loading /> : products}
    </div>
  );
}
export default Clothing;
