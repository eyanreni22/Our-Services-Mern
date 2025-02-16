const express =require('express')
const { protect, authorize,adminOnly } =require ("../middleware/authMiddleware");
const {
  getAllUsers,
  deleteUser,
  getAllBookings,
  deleteBooking,
  getAllServices,
  deleteService,
} = require("../controllers/adminController"); 
// const adminController = require("../controllers/adminController");


const router = express.Router();
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({ message: "Welcome, admin!" });
});


router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/users/:id", protect, adminOnly, deleteUser);

router.get("/bookings", protect, adminOnly, getAllBookings);
router.delete("/bookings/:id", protect, adminOnly, deleteBooking);

router.get("/services", protect, adminOnly, getAllServices);
router.delete("/services/:id", protect, adminOnly, deleteService);

module.exports = router;
