import React from "react";
import { NavLink, Link } from "react-router-dom";
import image from "../logo.png";
import "../Nav.css";

const Navbar = () => {
  const nav = document.querySelector(".nav");
  const toggleNavbar = () => {
    nav.classList.toggle("active");
  };
  return (
    <nav className="nav">
      <div className="logo-container">
        <img src={image} />
      </div>
      <ul className="nav-links">
        <li className="">
          <Link className="link" to="/playlists">
            Playlist
          </Link>
        </li>
        <li className="">
          <Link className="link" to="/podcasts">
            Podcasts
          </Link>
        </li>
        <li className="">
          <Link className="link" to="/places">
            Places
          </Link>
        </li>
      </ul>
      <div className="toggle-button" onClick={() => toggleNavbar()}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
