const dotenv = require("dotenv");

// Load .env file
dotenv.config();

// require("dotenv").config();
console.log(process.env.JWT_SECRET);


module.exports = {
    port: process.env.PORT || 5000,
    dbHost: process.env.DB_HOST || "localhost",
    dbUser: process.env.DB_USER || "root",
    dbPassword: process.env.DB_PASSWORD || "",
    dbName: process.env.DB_NAME || "employeeTaskTracker",
    jwtSecretKey: process.env.JWT_SECRET || ""
};