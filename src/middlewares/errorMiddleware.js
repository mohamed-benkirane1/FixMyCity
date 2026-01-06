const multer = require("multer");

function errorMiddleware(err, req, res, next) {
  if (!err) return next();

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "Image too large (max 5MB)" });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ error: err.message, field: err.field });
    }
    return res.status(400).json({ error: err.message });
  }

  if (err && err.message === "Only image files are allowed") {
    return res.status(400).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal server error" });
}

module.exports = errorMiddleware; // ✅ export = fonction
