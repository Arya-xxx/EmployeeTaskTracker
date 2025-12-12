
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth.routes");
// const userRoutes = require("./routes/user.routes");
// const taskRoutes = require("./routes/task.routes");

const app = express();

// // // ============================
// // // Middlewares
// // // ============================
app.use(cors());
app.use(express.json()); 
app.use(morgan("dev")); 

// // ============================
// // Routes
// // ============================
app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/tasks", taskRoutes);

console.log("APP FILE LOADED");



// ============================
// Health Check
// ============================
app.get("/heath", (req, res) => {
    console.log("started");
  res.json({ message: "Employee Task Tracker API is running..." });
});




const errorHandler = require("./middleware/errorHandler");

// // Global error handler (MUST be last)
app.use(errorHandler);

// ============================
// Global Error Handler
// ============================
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});








module.exports = app;

