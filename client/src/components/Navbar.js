import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav>
      <Link to="/">The Apothecary Shoppe</Link>
      <Link to="login">Login</Link>
      <Link to="signup">SignUp</Link>
      {AuthenticatorAssertionResponse.loggedIn() && (
        <Link to="/saved">My Searches</Link>
      )}
    </nav>
  );
}
