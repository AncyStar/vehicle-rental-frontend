import React, { useEffect, useState } from "react";
import API from "../services/api";
import VehicleCard from "../components/VehicleCard"; // ✅ Import VehicleCard

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    API.get("/vehicles")
      .then((response) => {
        console.log("Fetched Vehicles:", response.data); // ✅ Debugging log
        setVehicles(response.data || []); // ✅ Prevents undefined errors
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
        setVehicles([]); // ✅ Ensures an empty array if error occurs
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Available Vehicles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} /> // ✅ Uses VehicleCard component
          ))
        ) : (
          <p>No vehicles available.</p> // ✅ Handles empty state
        )}
      </div>
    </div>
  );
};

export default Vehicles;
