// client/src/components/Navbar.js

// Removed unused React import
import { Link } from "react-router-dom";
//import Auth from "../utils/auth";

export default function Navbar() {
  const logout = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
   // Auth.logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">The Apothecary Shoppe</Link>
      </div>
      <div className="navbar-links">
        <Link to="/search">Search Herbs</Link>
        {Auth.loggedIn() ? (
          <>
            <Link to="/saved">My Searches</Link>
            <Link to="/create-recipe">Create Recipe</Link>
            <Link to="/recipes">My Recipes</Link>
            <button onClick={logout} className="btn-link">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}