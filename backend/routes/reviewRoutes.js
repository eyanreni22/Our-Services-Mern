const express =require('express')
const { addReview, getReviews } =require ("../controllers/reviewController");
const { protect } =require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, addReview);
router.route("/:serviceId").get(getReviews);

module.exports = router;
