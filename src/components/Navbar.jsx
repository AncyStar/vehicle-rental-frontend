import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
    window.location.reload(); // Ensure page refresh for proper logout
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Vehicle Rental</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/vehicles" className="hover:underline">
          Vehicles
        </Link>
        <Link to="/my-bookings" className="hover:underline">
          My Bookings
        </Link>
        {!token ? (
          <>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:underline cursor-pointer bg-transparent border-none text-white"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
