import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/1.png";


const Header = () => {
   
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-olive">
      <div className="container-fluid">
      <img src={logo} height={100} width={100}/>
        <a className="navbar-brand fw-bold">The Apothecary Shoppe</a>
        <div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex flex-row gap-4">
      
            <Link to="/Home" className="hover:text-green-700">Home</Link>
            <Link to="/login" className="hover:text-green-700">Login</Link>
            <Link to="/signup" className="hover:text-green-700">Sign Up</Link>
            <Link to="/Myapothecary" className="hover:text-green-700">My Apothecary</Link>

    
          </ul>
        </div>
      </div>
    </nav>
    </header>
  );
}
export default Header;




      