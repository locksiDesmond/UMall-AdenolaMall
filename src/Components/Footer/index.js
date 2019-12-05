import React from "react";
import Umall from "../../images/svgs/umall-1.svg";
import { Link } from "react-router-dom";
import { FacebookIcon, TwitterIcon } from "react-share";
import { GoMarkGithub } from "react-icons/go";
function Footer() {
  const handleLike = ()=>{
    alert("HaHa who uses facebook in 2019 :) !")
    console.log("you found one Locksi's easter eggs")
  }
  return (
    <footer className="footer--section">
      <ul style={{ listStyle: "none" }}>
        <li>
          <Link to="/">
            <img style={{ height: "1.5rem" }} src={Umall} alt="logo" />
          </Link>
        </li>
        <li onClick={handleLike}>
          <FacebookIcon borderRadius="6" size="30" />
        </li>
        <li>
          <a href="https://twitter.com/locksi_Desmond">
            <TwitterIcon borderRadius="6" size="30" />
          </a>
        </li>
        <li>
          <a href="https://github.com/locksiDesmond/UMall-AdenolaMall">
            <GoMarkGithub style={{ fontSize: "30px" }} />
          </a>
        </li>
        <li>Locksi &copy; </li>
      </ul>
      <ul>
        <li>
          <Link to="/contactus">Contact Us</Link>
        </li>
        <li>
          <Link to="/TermsAndConditions">Terms and Conditions </Link>
        </li>
      </ul>
      <ul>
        <li style={{ FontWeight: "400", fontSize: "1.2rem" }}>Other related sites</li>
        <li>Jumia</li>
        <li>Futa</li>
        <li>Olx</li>
      </ul>
    </footer>
  );
}
export default Footer;
