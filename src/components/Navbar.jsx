import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token")); // ✅ Correctly update login state
    };

    window.addEventListener("storage", checkAuth); // ✅ Listen for changes in localStorage

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <nav className="bg-blue-500 p-4 flex justify-between">
      <h1 className="text-white font-bold text-lg">Vehicle Rental</h1>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/vehicles" className="text-white mr-4">
              Vehicles
            </Link>
            <Link
              to="/logout"
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white mr-4">
              Login
            </Link>
            <Link to="/register" className="text-white">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
