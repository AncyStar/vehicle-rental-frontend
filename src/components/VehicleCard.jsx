import { Link } from "react-router-dom";

const VehicleCard = ({ vehicle }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={vehicle.images[0]}
        alt={vehicle.model}
        className="w-full h-48 object-cover"
      />
      <h2 className="text-xl font-bold mt-2">
        {vehicle.make} {vehicle.model}
      </h2>
      <p>Year: {vehicle.year}</p>
      <p>Price: ${vehicle.pricePerDay}/day</p>
      <Link to={`/vehicle/${vehicle._id}`} className="text-blue-500">
        View Details
      </Link>
    </div>
  );
};

export default VehicleCard;
