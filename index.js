const express = require("express");
require("dotenv").config();

const app = express();

// DB
const connectDB = require("./src/config/db");
connectDB();

// Middlewares
app.use(express.json());

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
