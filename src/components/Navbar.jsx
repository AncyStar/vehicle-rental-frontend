import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("role") === "admin"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      setIsAdmin(localStorage.getItem("role") === "admin");
    };

    window.addEventListener("storage", checkAuth); // Detect login/logout changes
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Clear role as well
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/login");
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
            {isAdmin && (
              <Link to="/admin/add-vehicle" className="text-white mr-4">
                Admin Panel
              </Link>
            )}
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
