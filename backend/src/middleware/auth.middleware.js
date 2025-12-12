const jwt = require("jsonwebtoken");
const ApiError = require("./ApiError");
const { jwtSecretKey } = require('../config/env');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(ApiError.unauthorized("Token missing or invalid."));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.user = decoded; // { id, role }
        next();
    } catch (error) {
        return next(ApiError.unauthorized("Invalid or expired token."));
    }
};
