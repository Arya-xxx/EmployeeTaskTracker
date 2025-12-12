const http = require("http");
const app = require("./app");
const  db  = require('./config/db');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
console.log("SERVER FILE LOADED");


server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



setTimeout(async () => {
  console.log("⏳ Test timeout reached… Calling test-direct");

  try {
      const res = await fetch("http://localhost:5000/test-direct");
      const data = await res.json();
      console.log("🔥 API Response:", data);
  } catch (err) {
      console.error("❌ API call failed:", err.message);
  }

}, 3000);
