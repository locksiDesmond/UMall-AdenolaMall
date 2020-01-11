import React, { useState, useEffect } from "react";
import Description from "./index";
import { useLocation } from "react-router-dom";
import { DescriptionPageData, Userdata } from "./../DropdownPages/FetchData";

const TextDescription = props => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const uid = query.get("uid");
  const category = query.get("category");
  const doc = query.get("doc");
  let item = doc && DescriptionPageData(category, doc);
  let userdata = Userdata(uid);
  let location = { state: { item: item, userdata: userdata } };
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (item[0] !== "loading" && userdata[0] !== "loading") {
      setLoaded(true);
    }
  }, [item, userdata]);

  return (
    <React.Fragment>
      {props.location.state ? (
        <Description history={props.history} location={props.location} />
      ) : !loaded ? (
        <p>Loading</p>
      ) : (
        <Description history={props.history} location={location} />
      )}
    </React.Fragment>
  );
};
export default TextDescription;
