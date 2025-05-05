import React from "react";
import { Link } from "react-router-dom";
import Home from "./Home";
import HerbSearch from "./HerbSearch";
import myApothecary from "./MyApothecary"
import Footer from "./Footer";

const Header = () => {
   
  return (
    <header className="header">
      <h1 className="header-text">The Apothecary Shoppe</h1>
      <nav className="navbar">
        <ul>
          <li>
            <Link
              to="/"
            >
              Home
            </Link>
          </li>

          <li>
            <Link to="/MyApothecary">
              My Apothecary
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}
export default Header;
