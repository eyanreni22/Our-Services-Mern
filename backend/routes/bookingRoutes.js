const express =require('express')
const { createBooking, getUserBookings, getProviderBookings } =require("../controllers/bookingController");
const { protect} =require ("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createBooking);
router.route("/user").get(protect, getUserBookings);
router.route("/provider").get(protect, getProviderBookings);

module.exports = router;
