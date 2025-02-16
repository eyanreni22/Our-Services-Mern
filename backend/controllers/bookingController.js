const Booking = require("../models/Booking"); 


 const createBooking = async (req, res) => {
  const { serviceId, providerId, date } = req.body;

  const booking = new Booking({
    user: req.user._id,
    service: serviceId,
    provider: providerId,
    date,
  });

  await booking.save();
  res.status(201).json(booking);
};

 const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("service");
  res.json(bookings);
};

const getProviderBookings = async (req, res) => {
  const bookings = await Booking.find({ provider: req.user._id }).populate("service");
  res.json(bookings);
};
  module.exports={createBooking,getUserBookings,getProviderBookings}