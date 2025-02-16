const express =require('express')
const { createService, getAllServices, getServiceById } =require ("../controllers/serviceController");
const { protect} =require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getAllServices).post(protect, createService);
router.route("/:id").get(getServiceById);

module.exports = router;

