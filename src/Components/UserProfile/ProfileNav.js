import React from "react";
import Nav from "react-bootstrap/Nav";
function ProfileNav(props) {
  return (
    <Nav
      onSelect={props.onClick}
      fill
      variant="tabs"
      className="profile--nav"
      defaultActiveKey={props.display}
    >
      <Nav.Item>
        <Nav.Link eventKey="Recent"> Recent Upload</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Profiles</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2"> Edit</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
export default ProfileNav;
