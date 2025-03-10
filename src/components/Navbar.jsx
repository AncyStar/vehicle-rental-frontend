import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Vehicle Rental</h1>
      <div>
        <Link to="/" className="px-4">
          Home
        </Link>
        <Link to="/vehicles" className="px-4">
          Vehicles
        </Link>
        <Link to="/bookings" className="px-4">
          Bookings
        </Link>
        <Link to="/register" className="px-4">
          Register
        </Link>
        <Link to="/login" className="px-4">
          Login
        </Link>
        <Link to="/logout" className="px-4">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
