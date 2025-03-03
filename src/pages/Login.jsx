import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim input values to prevent issues
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validate input before sending request
    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required");
      return;
    }

    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const { data } = await axios.post(
        `${backendURL}/api/authentication/login`,
        { email: trimmedEmail, password: trimmedPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      // Ensure token exists before storing
      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("Stored Token:", localStorage.getItem("token"));
        navigate("/");
      } else {
        setError("Login successful, but token is missing.");
      }
    } catch (error) {
      console.error("Login error", error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
          "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold">Login</h2>

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded my-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded my-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
