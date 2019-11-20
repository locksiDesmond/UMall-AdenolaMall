import React, { useState } from "react";

import Newdata from "./FetchData";
import ProductCard from "./../ProductCard/index";
import Loading from "../../SmallComponent/Loading";

function Clothing(props) {
  const [state] = useState(props.location.state);
  const datas = Newdata(state.category, state.title);
  const products = (
    <div className="products">
      {datas.map(item => (
        <ProductCard data={item} />
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
