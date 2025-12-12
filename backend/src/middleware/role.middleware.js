const ApiError = require("./ApiError");

module.exports = function (roles = []) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(ApiError.forbidden("You are not allowed to perform this action."));
        }
        next();
    };
};
