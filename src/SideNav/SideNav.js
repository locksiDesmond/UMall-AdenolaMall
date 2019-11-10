import React from "react";

function SideNav() {
  return (
    <div className="SideNav">
      <div className="SideNav--dropdown">
        <div className="dropdown--list" href="/">
          Mobile Phones
        </div>
        <ul className="dropdown--item">
          <li>Techno</li>
          <li>Samsung</li>
        </ul>
      </div>
      <div className="SideNav--dropdown">
        <div className="dropdown--list" href="/">
          Mobile Phones
        </div>
        <ul className="dropdown--item">
          <li>Techno</li>
          <li>Samsung</li>
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
