import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token")); //Dynamically updates login state
    };

    window.addEventListener("storage", checkAuth); // Detect login/logout changes

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsLoggedIn(false); // Update state immediately
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between">
      <h1 className="text-white font-bold text-lg">Vehicle Rental</h1>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/vehicles" className="text-white mr-4">
              Vehicles
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
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
