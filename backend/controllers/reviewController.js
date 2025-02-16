const Review = require("../models/Review.js");
const Service = require("../models/Service");

const addReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Create a new review
    const review = new Review({
      user: req.user._id,
      service: serviceId,
      rating,
      comment,
    });

    await review.save();

    // Update service rating
    const reviews = await Review.find({ service: serviceId });
    const numReviews = reviews.length;
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / numReviews;

    await Service.findByIdAndUpdate(serviceId, { rating: avgRating, numReviews });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ service: req.params.serviceId }).populate("user", "name");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview, getReviews };
