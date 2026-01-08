require("dotenv").config({ path: require("path").resolve(__dirname, ".env") });

// Check for required environment variables and set defaults if not found
if (!process.env.JWT_SECRET) {
  console.warn("WARNING: JWT_SECRET not found in .env file. Using default secret for development.");
  process.env.JWT_SECRET = "default_jwt_secret_for_development_only_change_in_production";
}

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const dbConnect = require("./src/config/db");

const authRoutes = require("./src/routes/AuthRoute");
const reportRoutes = require("./src/routes/ReportRoute");
const userRoutes = require("./src/routes/UserRoute");

const errorMiddleware = require("./src/middlewares/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handling
app.use(errorMiddleware);

// Connect to database and start server
const PORT = process.env.PORT || 5000;

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Failed to connect to database:", err);
  process.exit(1);
});
