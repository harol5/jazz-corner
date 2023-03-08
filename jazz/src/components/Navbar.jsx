import React from "react";
import { NavLink, Link } from "react-router-dom";
import image from "../logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top">
      <div className="container-fluid">
        <img src={image} className="logo-min" />
        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <Link className="nav-link" to="/playlists">
                Playlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/podcasts">
                Podcasts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/places">
                Places
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
