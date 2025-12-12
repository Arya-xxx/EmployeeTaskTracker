const express = require("express");
const router = express.Router();

const { AuthController } = require("../controllers");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validations/auth.validation");

// ============================
// Auth Routes
// ============================

// Register
router.post("/register", validate(registerSchema), AuthController.register);

router.get("/check", (req, res) => {
    console.log("heyy");
    return res.json({ status: "working" });
});

// Login
router.post("/login", validate(loginSchema), AuthController.login);

console.log("AUTH ROUTES LOADED");


module.exports = router;
