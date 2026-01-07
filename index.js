const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// DB
const connectDB = require("./src/config/db");
connectDB();

// Middlewares
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json());
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend OK ✅" });
});


// Static uploads
app.use("/uploads", express.static("uploads"));

// Routes
const authRoutes = require("./src/routes/AuthRoute");
const reportRoutes = require("./src/routes/ReportRoute");

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

// Health / test
app.get("/", (req, res) => {
  res.json({ message: "✅ FixMyCity API is working" });
});

// Error handler (last)
const errorMiddleware = require("./src/middlewares/errorMiddleware");
app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
