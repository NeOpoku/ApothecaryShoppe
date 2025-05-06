import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/1.png";


const Header = () => {
   
  return (
    <header className="header">
      <h1 className="header-text">The Apothecary Shoppe</h1>
      <img src={logo}/>
      <nav className="navbar navbar-expand-lg navbar-dark bg-olive">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold">The Apothecary Shoppe</a>
        <div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row gap-4">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Apothecary</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </header>
  );
}
export default Header;




      