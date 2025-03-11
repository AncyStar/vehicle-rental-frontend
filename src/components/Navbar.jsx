import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
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
        <Link to="/bookings" className="hover:underline">
          Bookings
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
          <button onClick={handleLogout} className="hover:underline">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
