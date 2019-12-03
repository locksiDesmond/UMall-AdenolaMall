import React from "react";
import { GetUserPosts } from "./../DropdownPages/FetchData";
import ProductCard from "./../ProductCard/index";
import Spinner from "react-bootstrap/Spinner";
const RecentUploads = ({ user }) => {
  const devices = GetUserPosts("Devices", "date", 5, user.uid);
  const Devices = devices.map(item => (
    <ProductCard isDeleteable="true" data={item} key={item.date} />
  ));
  const cosmetics = GetUserPosts("Cosmetics", "date", 4, user.uid);
  const Cosmetics = cosmetics.map(item => (
    <ProductCard isDeleteable="true" key={item.date} data={item} />
  ));
  const footwears = GetUserPosts("Footwears", "date", 4, user.uid);
  const Footwears = footwears.map(item => (
    <ProductCard isDeleteable="true" key={item.date} data={item} />
  ));
  const clothings = GetUserPosts("Clothings", "date", 4, user.uid);
  const Clothings = clothings.map(item => (
    <ProductCard isDeleteable="true" key={item.date} data={item} />
  ));
  const household = GetUserPosts("Household items", "date", 4, user.uid);
  const Household = household.map(item => (
    <ProductCard isDeleteable="true" key={item.date} data={item} />
  ));
  const Loading = (
    <Spinner
      as="span"
      animation="border"
      size="lg"
      role="status"
      aria-hidden="true"
      style={{ color: "#02aff2" }}
    />
  );
  return (
    <React.Fragment>
      <div className="products">
        {devices[0] === "loading" ||
        footwears[0] === "loading" ||
        clothings[0] === "loading" ||
        household[0] === "loading" ||
        cosmetics[0] === "loading" ? (
          <p>{Loading}</p>
        ) : (
          <React.Fragment>
            {Devices}
            {Footwears}
            {Clothings}
            {Household}
            {Cosmetics}
            <hr />
          </React.Fragment>
        )}
        {!devices ||
          !footwears ||
          !clothings ||
          !household ||
          (!cosmetics && <p>item not found</p>)}
      </div>
    </React.Fragment>
  );
};
export default RecentUploads;
