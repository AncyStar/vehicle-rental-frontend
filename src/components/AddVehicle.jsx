import { useState } from "react";
import axios from "axios";

const AddVehicle = () => {
  const [vehicle, setVehicle] = useState({
    make: "",
    model: "",
    year: "",
    pricePerDay: "",
    availability: true,
    images: [""],
    description: "",
  });
  const [message, setMessage] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Admin token

    try {
      const { data } = await axios.post(`${backendUrl}/api/vehicles`, vehicle, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Vehicle Added:", data);

      setMessage("Vehicle added successfully!");
      setVehicle({
        make: "",
        model: "",
        year: "",
        pricePerDay: "",
        availability: true,
        images: [""],
        description: "",
      });
    } catch (error) {
      setMessage("Error adding vehicle.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Add New Vehicle</h1>

      {message && <p className="text-red-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="make"
          placeholder="Make"
          value={vehicle.make}
          onChange={handleChange}
          required
          className="w-full p-2 border my-2"
        />
        <input
          type="text"
          name="model"
          placeholder="Model"
          value={vehicle.model}
          onChange={handleChange}
          required
          className="w-full p-2 border my-2"
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={vehicle.year}
          onChange={handleChange}
          required
          className="w-full p-2 border my-2"
        />
        <input
          type="number"
          name="pricePerDay"
          placeholder="Price per Day"
          value={vehicle.pricePerDay}
          onChange={handleChange}
          required
          className="w-full p-2 border my-2"
        />
        <input
          type="text"
          name="images"
          placeholder="Image URL"
          value={vehicle.images[0]}
          onChange={(e) => setVehicle({ ...vehicle, images: [e.target.value] })}
          required
          className="w-full p-2 border my-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={vehicle.description}
          onChange={handleChange}
          className="w-full p-2 border my-2"
        ></textarea>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
