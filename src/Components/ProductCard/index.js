import React, { useState } from "react";
import logo from "../../images/shoes.jpeg";

// import heart from "../../images/svgs/Heart.svg";
import { Userdata } from "../DropdownPages/FetchData";
import ProductClass from "./ProductClass";
import Loading from "../../SmallComponent/Loading";
function ProductCard(props) {
  const [item] = useState(props.data);
  const nulli = {
    photoUrl: logo,
    username: "Demo"
  };
  const newuser = item.uid ? Userdata(item.uid) : nulli;
  return (
    <React.Fragment>
      {newuser[0] === "loading" ? (
        <Loading />
      ) : (
        <ProductClass newuser={newuser} data={item} />
      )}
    </React.Fragment>
  );
}

export default ProductCard;
