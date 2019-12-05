import React from "react";
const ContactUs = () => {
  return (
    <div style={{ padding: "1rem 2rem", fontSize: "1rem" }}>
      <h1>Contact Us</h1>
      <div>
        <h2> Website Info</h2>
        <div>
          <p className="signin-form-name">
            name: <span> Umall</span>
          </p>
          <p className="signin-form-name">
            url: <span> Umall.website</span>
          </p>
          <p>
            This site is created for Futarians buyers and sellers to meet one
            another
          </p>
        </div>
        <div>
          <p style={{ fontSize: "1.2rem" }}> Likely Updates</p>
          <ul>
            <li>Add Vendors pages</li>
            <li>Allow users and anonymous users to chat</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>Developers info</h2>
        <div>
          <p>Devloped by Adenola Olamikan Desmond</p>
          <p className="signin-form-name">
            Email :
            <span className="signin-form-name">Des.olanrewaju@gmail.com</span>
          </p>
          <p className="signin-form-name">
            Phone Number : <span>08148191312</span>
          </p>
          <p>locksi&copy; 2019</p>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
