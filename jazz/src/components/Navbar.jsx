import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "../logo.png";
import "../Nav.css";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const getClassName = () => {
    let baseClassName = "nav";
    baseClassName += toggle ? " active" : "";
    return baseClassName;
  };

  return (
    <nav className={getClassName()}>
      <div className="logo-container">
        <img src={image} alt="" />
      </div>
      <ul className="nav-links">
        <li>
          <Link className="link" to="/playlists">
            Playlist
          </Link>
        </li>
        <li>
          <Link className="link" to="/podcasts">
            Podcasts
          </Link>
        </li>
        <li>
          <Link className="link" to="/places">
            Places
          </Link>
        </li>
      </ul>
      <div className="toggle-button" onClick={() => setToggle(!toggle)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
