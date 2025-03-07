import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); //  Clear token
    navigate("/login"); // Redirect to login
  }, [navigate]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold">Logging out...</h2>
    </div>
  );
};

export default Logout;
