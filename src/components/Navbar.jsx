import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-xl font-bold">Vehicle Rental System</h1>
        <div>
          <Link to="/" className="text-white px-3">
            Home
          </Link>
          <Link to="/login" className="text-white px-3">
            Login
          </Link>
          <Link to="/register" className="text-white px-3">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
