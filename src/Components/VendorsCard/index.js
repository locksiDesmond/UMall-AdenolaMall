import React from "react";
import VendorsClass from "./VendorsClass";
import { ContextCreator } from "../../Context/Context";

function VendorsCard({ item }) {
  return (
    <React.Fragment>
      <ContextCreator.Consumer>
        {({ firebase, authenticated, user }) => (
          <VendorsClass
            firebase={firebase}
            authenticated={authenticated}
            user={user}
            item={item}
          />
        )}
      </ContextCreator.Consumer>
    </React.Fragment>
  );
}
export default VendorsCard;
