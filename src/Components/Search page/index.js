import React from "react";
import { SearchData } from "./../DropdownPages/FetchData";
import ProductCard from "../ProductCard";
const Search = props => {
  const search = props.location.state;

  const Devices = SearchData("Devices", search).map(item => (
    <ProductCard data={item} key={item.date} />
  ));

  const Footwears = SearchData("Footwears", search).map(item => (
    <ProductCard data={item} key={item.date} />
  ));
  const Cosmetics = SearchData("Cosmetics", search).map(item => (
    <ProductCard data={item} key={item.date} />
  ));
  const Clothings = SearchData("Clothings", search).map(item => (
    <ProductCard data={item} key={item.date} />
  ));
  const HouseHold = SearchData("Household appliances", search).map(item => (
    <ProductCard data={item} key={item.date} />
  ));
  return (
    <div className="main--content">
      <div>
        <h1>Devices</h1>
        <div className="products">
          {Devices.length === 0 ? <p>item not found</p> : Devices}
        </div>
      </div>
      <div>
        <h1>Clothings</h1>
        <div className="products">
          {Clothings.length === 0 ? <p>item not found</p> : Clothings}
        </div>
      </div>
      <div>
        <h1>Footwears</h1>
        <div className="products">
          {Footwears.length === 0 ? <p>item not found</p> : Footwears}
        </div>
      </div>
      <div>
        <h1>Cosmetics</h1>
        <div className="products">
          {Cosmetics.length === 0 ? <p>item not found</p> : HouseHold}
        </div>
      </div>
      <div>
        <h1>Household appliances</h1>
        <div className="products">
          {HouseHold.length === 0 ? <p>item not found</p> : HouseHold}
        </div>
      </div>
    </div>
  );
};
export default Search;
