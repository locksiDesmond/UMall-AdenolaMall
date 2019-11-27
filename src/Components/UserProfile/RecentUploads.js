import React from "react";
import { GetUserPosts } from "./../DropdownPages/FetchData";
import ProductCard from "./../ProductCard/index";
const RecentUploads = ({ user }) => {
  const devices = GetUserPosts("Devices", "date", 5, user.uid);
  console.log(devices);
  const Devices = devices.map(item => (
    <ProductCard data={item} key={item.date} />
  ));
  const cosmetics = GetUserPosts("Cosmetics", "date", 4, user.uid);
  const Cosmetics = cosmetics.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  const footwears = GetUserPosts("Footwears", "date", 4, user.uid);
  const Footwears = footwears.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  const clothings = GetUserPosts("Clothings", "date", 4, user.uid);
  const Clothings = clothings.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  const household = GetUserPosts("Household items", "date", 4, user.uid);
  const Household = household.map(item => (
    <ProductCard key={item.date} data={item} />
  ));
  return (
    <React.Fragment>
      <div className="products">
        {devices[0] === "loading" ? <p>loading</p> : Devices}
        {footwears[0] === "loading" ? <p>loading</p> : Footwears}
        {clothings[0] === "loading" ? <p>loading</p> : Clothings}
        {household[0] === "loading" ? <p>loading</p> : Household}
        {cosmetics[0] === "loading" ? <p>loading</p> : Cosmetics}
      </div>
    </React.Fragment>
  );
};
export default RecentUploads;
