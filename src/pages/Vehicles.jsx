import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    API.get("/vehicles")
      .then((response) => {
        setVehicles(response.data || []);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setVehicles([]);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Available Vehicles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <div key={vehicle._id} className="border p-4 rounded-lg shadow-lg">
              <img
                src={vehicle.images?.[0] || "/default-car.jpg"} // ✅ Changed from imageUrls to images
                alt={vehicle.model || "Unknown Model"}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-semibold">
                {vehicle.make || "Unknown"} {vehicle.model || ""}
              </h3>
              <p>Year: {vehicle.year || "N/A"}</p>
              <p>Price per day: ${vehicle.pricePerDay || "N/A"}</p>
              <p>Location: {vehicle.location || "Unknown"}</p>
              <Link
                to={`/vehicles/${vehicle._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No vehicles available.</p> // ✅ Handles empty state
        )}
      </div>
    </div>
  );
};

export default Vehicles;
