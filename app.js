const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());

const bookings = []; // Array to store bookings

app.post("/bookingkamaroperasi/:booking/:duration", (req, res) => {
  const { booking, duration } = req.params;

  // Extract the bookingDate and startTime from the booking parameter
  const [bookingDate, startTime] = booking.split("T");

  // Calculate the start and end times for the booking (add 2 hours to the duration to account for setup and cleanup)
  const date = `${bookingDate}T${startTime}:00.000Z`;
  const start = new Date(date);
  const endTime = new Date(date);
  endTime.setHours(endTime.getHours() + parseInt(duration) + 1);
  endTime.setMinutes(endTime.getMinutes() + 59);
  endTime.toISOString();

  // Check if the operation room is available during the requested time period
  const conflicts = bookings.some(
    (booking) => booking.start < endTime && booking.endTime > start
    );

  if (conflicts) {
    // If there is a conflict, return a 409 Conflict response and false message
    res.status(409).json({ message: false });
  } else {
    // If the operation room is available, add the booking to the array and return a 200 OK response and true message
    bookings.push({ start, endTime });
    res.status(200).json({ message: true });
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
