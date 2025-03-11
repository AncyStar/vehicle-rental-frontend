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
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
