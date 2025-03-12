import API from "./api"; // Import the configured Axios instance

// Fetch a booking by ID
export const fetchBooking = async (bookingId) => {
  if (!bookingId || bookingId.length !== 24) {
    console.error("Invalid booking ID:", bookingId);
    throw new Error("Invalid booking ID");
  }

  try {
    const response = await API.get(`/bookings/${bookingId}`);
    return response.data; // Return data for use in React components
  } catch (error) {
    console.error(
      "Error fetching booking:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to fetch booking");
  }
};
