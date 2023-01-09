const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());

const bookings = []; // Array to store bookings

app.post("/bookingkamaroperasi/:booking/:duration", (req, res) => {
  const { booking, duration } = req.params;

  // Extract the bookingDate and startTime from the booking parameter
  const [bookingDate, startTime] = booking.split("T");

  // Calculate the start and end times for the booking
  const start = `${bookingDate}T${startTime}`;
  const endTime = new Date(start);
  endTime.setHours(endTime.getHours() + parseInt(duration, 10));

  // Check if the operation room is available during the requested time period
  const conflicts = bookings.some((booking) => {
    return (
      (start >= booking.startTime && start < booking.endTime) ||
      (endTime > booking.startTime && endTime <= booking.endTime) ||
      (start <= booking.startTime && endTime >= booking.endTime)
    );
  });

  if (conflicts) {
    // If there is a conflict, return a 409 Conflict response
    res.status(409).json({ message: false });
  } else {
    // If the operation room is available, add the booking to the array and return a 200 OK response
    bookings.push({ start, endTime });
    res.status(200).json({ message: true });
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
