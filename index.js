const express = require("express");
require("dotenv").config();

const app = express();

/* ======================
   Database connection
====================== */
const connectDB = require("./src/config/db");
connectDB();

/* ======================
   Middlewares
====================== */
app.use(express.json());

/* ======================
   Test route
====================== */
app.get("/", (req, res) => {
  res.json({ message: "✅ FixMyCity API is working" });
});

/* ======================
   Routes
====================== */
const authRoutes = require("./src/routes/AuthRoute");
const reportRoutes = require("./src/routes/ReportRoute");

/* ======================
   API endpoints
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

/* ======================
   Static uploads
====================== */
app.use("/uploads", express.static("uploads"));

/* ======================
   Error handler (last)
====================== */
const errorMiddleware = require("./src/middlewares/errorMiddleware");
app.use(errorMiddleware);

/* ======================
   Server
====================== */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
