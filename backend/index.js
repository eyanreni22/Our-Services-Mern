const express =require('express')
require('dotenv').config();
// console.log(process.env.JWT_SECRET); // This should print your JWT secret to the console
// const dotenv=require("dotenv");
const cors=require('cors');
// const connection =require("./config/db")
const connectDB = require("./config/db");
const reviewRoutes = require("./routes/reviewRoutes");

const  userRoutes =require  ("./routes/userRoutes");
const serviceRoutes = require ("./routes/serviceRoutes");
const bookingRoutes = require ("./routes/bookingRoutes");
const adminRoutes = require ("./routes/adminRoutes");

// Initialize app
connectDB()
// dotenv.config()
const app=express()
const PORT=process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);



// Default route
app.get("/", (req, res) => {
res.send("Our-Services Backend Running!");
});

const User = require("./models/User");

app.get("/test", async (req, res) => {
  try {
    const user = new User({
      name: "JohDoe",
      email: "johndoe@example.com",     
      password: "password123",
      phone: "1234967890",
      role: "customer",
    });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


