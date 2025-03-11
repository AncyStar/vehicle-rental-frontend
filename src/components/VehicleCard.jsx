import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  if (!vehicle) return null;
  return (
    <div className="border p-4 rounded shadow">
      <img
        src={vehicle.images?.[0] || "/placeholder.jpg"}
        alt={vehicle.model}
        className="w-full h-48 object-cover"
      />
      <h2 className="text-lg font-semibold">
        {vehicle.make} {vehicle.model}
      </h2>
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.pricePerDay}/day</p>

      <Link
        to={`/vehicles/${vehicle._id}`}
        className="bg-blue-500 text-white px-4 py-2 mt-2 inline-block rounded"
      >
        View Details
      </Link>
    </div>
  );
};

export default VehicleCard;
