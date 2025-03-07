import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleDetails from "./pages/VehicleDetails";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import AddVehicle from "./components/AddVehicle";
import Vehicles from "./pages/Vehicles";
import Logout from "./pages/Logout";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicle/:vehicleId" element={<VehicleDetails />} />
        <Route path="/booking/:vehicleId" element={<Booking />} />
        <Route path="/payment/:bookingId" element={<Payment />} />
        <Route path="/admin/add-vehicle" element={<AddVehicle />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
