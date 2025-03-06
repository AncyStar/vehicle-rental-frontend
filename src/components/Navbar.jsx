import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-xl font-bold">Vehicle Rental System</h1>
        <div>
          <Link to="/" className="text-white px-3">
            Home
          </Link>
          {user ? (
            <>
              <span className="text-white px-3">Welcome, {user.name}</span>
              <button onClick={handleLogout} className="text-white px-3">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white px-3">
                Login
              </Link>
              <Link to="/register" className="text-white px-3">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
