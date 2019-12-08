import React, { useState } from "react";
import logo from "../../images/shoes.jpeg";
import { Userdata, secondsToHms } from "../DropdownPages/FetchData";
import ProductClass from "./ProductClass";
import { ContextCreator } from "../../Context/Context";
// import { sec2time } from "./../DropdownPages/FetchData";
function ProductCard(props) {
  const [item] = useState(props.data);
  const nulli = {
    photoUrl: logo,
    username: "Demo"
  };
  const date = Date.now();
  // const time = sec2time((date - item.date) * 1000);
  const time = secondsToHms((date - item.date) / 1000);
  const newuser = item.uid ? Userdata(item.uid) : nulli;
  return (
    <React.Fragment>
      {newuser[0] !== "loading" && (
        <ContextCreator.Consumer>
          {({ firebase, user, authenticated }) => (
            <ProductClass
              isDeleteable={props.isDeleteable}
              newuser={newuser}
              data={item}
              time={time}
              user={user}
              authenticated={authenticated}
              firebase={firebase}
              handlerefresh={props.handlerefresh}
            />
          )}
        </ContextCreator.Consumer>
      )}
    </React.Fragment>
  );
}

export default ProductCard;
