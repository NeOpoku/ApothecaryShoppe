import React from "react";
import { Link } from "react-router-dom";
function isLoggedIn(): boolean {
  // Replace this with your actual authentication logic
  return false; // Example: Change to true if the user is logged in
}

export default function Navbar() {
  return (
    <nav>
      {isLoggedIn() && (
        <Link to="/saved">My Searches</Link>
      )}
      <>
        <Link to="login">Login</Link>
        <Link to="signup">SignUp</Link>
      </>
      {isLoggedIn() && (
        <Link to="/saved">My Searches</Link>
      )}
    </nav>
  );
}
