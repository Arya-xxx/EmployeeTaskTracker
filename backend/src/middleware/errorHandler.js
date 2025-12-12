const ApiError = require("./ApiError");

module.exports = (err, req, res, next) => {
  console.error("ERROR:", err);

  // Custom ApiError class
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Sequelize: Duplicate key / unique constraint
  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      success: false,
      message: "Record already exists (duplicate entry)."
    });
  }

  // Sequelize Validation Error
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      success: false,
      message: err.errors.map(e => e.message).join(", "),
    });
  }

  // Missing required fields
  if (err.type === "VALIDATION_ERROR") {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token provided."
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token has expired. Please login again."
    });
  }

  // Not Found
  if (err.statusCode === 404) {
    return res.status(404).json({
      success: false,
      message: err.message || "Resource not found."
    });
  }

  // Fallback Internal Server Error
  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};
