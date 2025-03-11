import React from "react";
import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  if (!vehicle) return null; // ✅ Prevents errors if vehicle is undefined

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img
        src={vehicle.imageUrls?.[0] || "/default-car.jpg"} // ✅ Safe access with a default image
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
  );
};

export default VehicleCard;
