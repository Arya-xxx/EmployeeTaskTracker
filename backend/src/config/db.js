const mysql = require("mysql2/promise");
const env = require("./env");

// create the connection pool
const pool = mysql.createPool({
    host: env.dbHost,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
(async () => {
    // console.log("password", pool.password);
    try {
        const connection = await pool.getConnection();
        console.log("📦 MySQL connected successfully");
        connection.release();
    } catch (error) {
        console.error("❌ MySQL connection failed:", error);
    }
})();

// module.exports = pool;
