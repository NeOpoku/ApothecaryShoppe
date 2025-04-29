import { Link } from "react-router-dom";
//import { useState } from "react";

const NavBar = () => {
  // Fake user authentication state
  //const [user, setUser] = useState(null); // null = not logged in
  const user = getUserFromToken(); // Replace with actual authentication logic

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-800">
          Apothecary Shoppe
        </Link>

        {/* Icons + Buttons */}
        <div className="flex items-center space-x-4">
          {/* Search and Drawer Icons */}
          <button aria-label="Search" className="text-green-700 hover:text-green-500 text-xl">
            🔍
          </button>
          <button aria-label="Categories" className="text-green-700 hover:text-green-500 text-xl">
            ☰
          </button>

          {/* If user is NOT logged in */}
          {!user && (
            <>
              <Link to="/login" className="px-4 py-2 text-green-700 font-semibold hover:text-green-500">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white rounded-full font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
         {user && <p className="text-green-700">Welcome, {user.name}!</p>}

          {/* If user IS logged in */}
          {user && (
            <Link
              to="/profile"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold"
            >
              My Profile
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
function getUserFromToken() {
    // Example implementation: Replace with actual logic to retrieve user from token
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    try {
        const user = JSON.parse(atob(token.split(".")[1])); // Decode token payload
        return user; // Return user object if valid
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}

