import React, { useState } from "react";
import { SearchData } from "./../DropdownPages/FetchData";
import ProductCard from "../ProductCard";
import ButtonLg from "./../../SmallComponent/ButtonLg";
const Search = props => {
  const search = props.location.state.toLowerCase();
  const [devicesmore, setDMore] = useState();
  const [footwearsmore, setFMore] = useState();
  const [cosmeticsmore, setCMore] = useState();
  const [clothingsmore, setClMore] = useState();
  const [homemore, setHMore] = useState();

  const Devices = SearchData("Devices", search, devicesmore).map(item => (
    <ProductCard data={item} key={item.date} />
  ));

  const Footwears = SearchData("Footwears", search, footwearsmore).map(item => (
    <ProductCard data={item} key={item.date} />
  ));
  const Cosmetics = SearchData("Cosmetics", search, cosmeticsmore).map(item => (
    <ProductCard data={item} key={item.date} />
  ));
  const Clothings = SearchData("Clothings", search, clothingsmore).map(item => (
    <ProductCard data={item} key={item.date} />
  ));
  const HouseHold = SearchData(
    "Household items",
    search,
    homemore
  ).map(item => <ProductCard data={item} key={item.date} />);
  return (
    <div className="main--content">
      <div className="trends">
        <p>
          Devices
          <span>
            {Devices.length !== 0 && (
              <span style={{ marginLeft: "1rem", fontSize: ".9rem" }}>
                {Devices.length} items found
              </span>
            )}
          </span>
        </p>
        <div className="products">
          {Devices.length === 0 ? <p>item not found</p> : Devices}
        </div>
        {Devices.length > 4 && (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              margin: ".5rem .1rem 1rem .1rem"
            }}
          >
            <ButtonLg
              disabled={Devices.length[0] === "loading" ? true : false}
              title="show more"
              onClick={() => setDMore(devicesmore + 2)}
            />
          </div>
        )}
      </div>
      <div className="trends">
        <p>
          Clothings
          <span>
            {Clothings.length !== 0 && (
              <span style={{ marginLeft: "1rem", fontSize: ".9rem" }}>
                {Clothings.length} items found
              </span>
            )}
          </span>
        </p>
        <div className="products">
          {Clothings.length === 0 ? <p>item not found</p> : Clothings}
        </div>
        {Clothings.length > 4 && (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              margin: ".5rem .1rem 1rem .1rem"
            }}
          >
            <ButtonLg
              disabled={Clothings.length[0] === "loading" ? true : false}
              title="show more"
              onClick={() => setClMore(clothingsmore + 2)}
            />
          </div>
        )}
      </div>
      <div className="trends">
        <p>
          Footwears
          <span>
            {Footwears.length !== 0 && (
              <span style={{ marginLeft: "1rem", fontSize: ".9rem" }}>
                {Footwears.length} items found
              </span>
            )}
          </span>
        </p>
        <div className="products">
          {Footwears.length === 0 ? <p>item not found</p> : Footwears}
        </div>
        {Footwears.length > 4 && (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              margin: ".5rem .1rem 1rem .1rem"
            }}
          >
            <ButtonLg
              disabled={Footwears.length[0] === "loading" ? true : false}
              title="show more"
              onClick={() => setFMore(footwearsmore + 2)}
            />
          </div>
        )}
      </div>
      <div className="trends">
        <p>
          Cosmetics
          <span>
            {Cosmetics.length !== 0 && (
              <span style={{ marginLeft: "1rem", fontSize: ".9rem" }}>
                {Cosmetics.length} items found
              </span>
            )}
          </span>
        </p>
        <div className="products">
          {Cosmetics.length === 0 ? <p>item not found</p> : Cosmetics}
        </div>
        {Cosmetics.length > 4 && (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              margin: ".5rem .1rem 1rem .1rem"
            }}
          >
            <ButtonLg
              disabled={Cosmetics.length[0] === "loading" ? true : false}
              title="show more"
              onClick={() => setCMore(cosmeticsmore + 2)}
            />
          </div>
        )}
      </div>
      <div className="trends">
        <p>
          HouseHold
          <span>
            {HouseHold.length !== 0 && (
              <span style={{ marginLeft: "1rem", fontSize: ".9rem" }}>
                {HouseHold.length} items found
              </span>
            )}
          </span>
        </p>
        <div className="products">
          {HouseHold.length === 0 ? <p>item not found</p> : HouseHold}
        </div>
        {HouseHold.length > 4 && (
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              margin: ".5rem .1rem 1rem .1rem"
            }}
          >
            <ButtonLg
              disabled={HouseHold.length[0] === "loading" ? true : false}
              title="show more"
              onClick={() => setHMore(homemore + 2)}
            />
          </div>
        )}
      </div>
      {/* <div className="trends">
        <p>Clothings</p>
        <div className="products">
          {Clothings.length === 0 ? <p>item not found</p> : Clothings}
        </div>
      </div>
      <div className="trends">
        <p>Footwears</p>
        <div className="products">
          {Footwears.length === 0 ? <p>item not found</p> : Footwears}
        </div>
      </div>
      <div className="trends">
        <p>Cosmetics</p>
        <div className="products">
          {Cosmetics.length === 0 ? <p>item not found</p> : HouseHold}
        </div>
      </div>
      <div className="trends">
        <p>Household appliances</p>
        <div className="products">
          {HouseHold.length === 0 ? <p>item not found</p> : HouseHold}
        </div>
      </div> */}
    </div>
  );
};
export default Search;
