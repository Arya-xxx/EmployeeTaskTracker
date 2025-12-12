const Joi = require("joi");

exports.registerSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),
    userRole: Joi.string().valid("admin", "employee").default("employee")
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});
