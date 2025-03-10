import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddVehicle = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    year: "",
    pricePerDay: "",
    availability: true,
    images: [],
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Check if user is admin on mount
  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  // ✅ Handle file upload properly with FormData
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setVehicle({ ...vehicle, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setMessage("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to add a vehicle.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("make", vehicle.make);
      formData.append("model", vehicle.model);
      formData.append("year", vehicle.year);
      formData.append("pricePerDay", vehicle.pricePerDay);
      formData.append("availability", vehicle.availability);
      formData.append("description", vehicle.description);
      vehicle.images.forEach((image) => formData.append("images", image));

      await axios.post(`${backendUrl}/api/vehicles`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Vehicle added successfully!");
      setTimeout(() => navigate("/vehicles"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error adding vehicle.");
    }
  };

  // ✅ Conditional Rendering for Unauthorized Users
  if (!isAdmin) {
    return (
      <div className="container mx-auto p-4 text-red-500">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Add New Vehicle</h1>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="make"
          placeholder="Make"
          value={vehicle.make}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={vehicle.model}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={vehicle.year}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="number"
          name="pricePerDay"
          placeholder="Price per Day"
          value={vehicle.pricePerDay}
          onChange={handleChange}
          required
          className="input"
        />

        {/* ✅ File Input for Images */}
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          className="input"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={vehicle.description}
          onChange={handleChange}
          className="input"
        ></textarea>

        <button type="submit" className="btn">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
