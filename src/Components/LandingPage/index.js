import React from "react";
import { Link } from "react-router-dom";
import MainNav from "../Navbar/MainNav";

const LandingPage = () => {
  return (
    <div>
      <MainNav />
      <h2>Landing Page</h2>
      <Link to="signin">SignIn</Link>
      <Link to="signup">signup</Link>
    </div>
  );
};
export default LandingPage;
