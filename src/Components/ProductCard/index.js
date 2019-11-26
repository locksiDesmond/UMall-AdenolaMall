import React, { useState } from "react";
import logo from "../../images/shoes.jpeg";
import { Userdata } from "../DropdownPages/FetchData";
import ProductClass from "./ProductClass";
function ProductCard(props) {
  const [item] = useState(props.data);
  const nulli = {
    photoUrl: logo,
    username: "Demo"
  };
  const newuser = item.uid ? Userdata(item.uid) : nulli;
  return (
    <React.Fragment>
      {newuser[0] !== "loading" && (
        <ProductClass newuser={newuser} data={item} />
      )}
    </React.Fragment>
  );
}

export default ProductCard;
