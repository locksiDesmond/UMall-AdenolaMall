import React, { useState } from "react";
import RecentUploads from "./../UserProfile/RecentUploads";
import { OwnersDetails } from "./DescriptionBody";

import { useLocation } from "react-router-dom";
import { Userdata } from "./../DropdownPages/FetchData";
import Loading from "./../../SmallComponent/Loading";
const VendorsProducts = props => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const uid = query.get("uid");
  let userdata = uid ? Userdata(uid) : props.userdata;
  const [user] = useState({
    uid: uid || props.userdata.doc
  });
  return (
    <React.Fragment>
      <div className="description--page  reverse">
        {userdata[0] === "loading" ? (
          <Loading />
        ) : (
          <React.Fragment>
            <div className="product--description">
              <h3>Available Products</h3>
              <RecentUploads handlerefresh={props.handlerefresh} user={user} />
            </div>
            <div className="description--aside">
              <OwnersDetails userdata={userdata} item={props.item} />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};
export default VendorsProducts;
