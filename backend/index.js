// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const http = require("http");
// const path = require("path");
// require("dotenv").config();

// // Connect MongoDB
// const connectDB = require("./config/db");
// connectDB();

// const app = express();
// const server = http.createServer(app);

// // ✅ Initialize Socket.IO
// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: { origin: "http://localhost:5173", credentials: true },
// });

// // ✅ Attach io to req object
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });



// app.use(cors({
//   origin: 'http://localhost:5173', // your frontend port
//   credentials: true,
// }));


// // ✅ Middleware
// // app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Serve Static Files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/invoices", express.static(path.join(__dirname, "invoices")));
// app.use(express.static(path.join(__dirname, 'public')));


// // ✅ WebSocket Handlers
// const setupBookingSocket = require("./sockets/bookingSocket");
// const setupGPSSocket = require("./sockets/gpsSocket");
// setupBookingSocket(io);
// setupGPSSocket(io);

// // ✅ API Routes
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/admins", require("./routes/adminRoutes"));
// app.use("/api/services", require("./routes/serviceRoutes"));
// app.use("/api/bookings", require("./routes/bookingRoutes"));
// app.use("/api/reviews", require("./routes/reviewRoutes"));
// app.use("/api/payments", require("./routes/paymentRoutes"));
// app.use("/api/invoices", require("./routes/invoiceRoutes"));
// // app.use("/api/reports", require("./routes/reportRoutes"));

// app.get('/test-invoice', (req, res) => {
//   res.sendFile(path.join(__dirname, 'invoices/invoice_67ee7ec0c93921d497c8350d.pdf'));
// });
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
// app.get("/test-review", (req, res) => {
//   res.send("✅ Review API is working");
// });



// // ✅ Error Handling
// const { errorHandler } = require("./middlewares/errorMiddleware");
// app.use(errorHandler);

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const http = require("http");
const path = require("path");
require("dotenv").config();

// Connect MongoDB
const connectDB = require("./config/db");
connectDB();

const app = express();
const server = http.createServer(app);

// ✅ Initialize Socket.IO
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: ["http://localhost:5173", "https://your-frontend.vercel.app"], credentials: true },
});

// ✅ Attach io to req object
app.use((req, res, next) => {
  req.io = io;
  next();
});

// ✅ Handle CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://our-services-mern.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// ✅ Preflight requests support
app.options('*', cors());
app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Serve Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/invoices", express.static(path.join(__dirname, "invoices")));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ WebSocket Handlers
const setupBookingSocket = require("./sockets/bookingSocket");
const setupGPSSocket = require("./sockets/gpsSocket");
setupBookingSocket(io);
setupGPSSocket(io);

// ✅ API Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));

// ✅ Test Routes
app.get("/test-invoice", (req, res) => {
  res.sendFile(path.join(__dirname, "invoices/invoice_67ee7ec0c93921d497c8350d.pdf"));
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/test-review", (req, res) => {
  res.send("✅ Review API is working");
});

// ✅ Error Handling
const { errorHandler } = require("./middlewares/errorMiddleware");
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
