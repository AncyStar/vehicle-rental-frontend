import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios
      .get("/vehicles")
      .then((response) => setVehicles(response.data))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Vehicles</h2>
      <div className="grid grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={vehicle.imageUrls[0]}
              alt={vehicle.model}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-semibold">
              {vehicle.make} {vehicle.model}
            </h3>
            <p>Year: {vehicle.year}</p>
            <p>Price per day: ${vehicle.pricePerDay}</p>
            <p>Location: {vehicle.location}</p>
            <Link
              to={`/vehicles/${vehicle._id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
