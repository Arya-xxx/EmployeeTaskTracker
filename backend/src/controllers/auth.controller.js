const { AuthService } = require("../services");
const ApiError = require("../utils/ApiError");

class AuthController {

    // REGISTER
    static async register(req, res, next) {
        try {
            const { fullName, email, password, userRole } = req.body;

            if (!fullName || !email || !password) {
              return next(ApiError.badRequest("fullName, email, and password are required."));
            }
            const user = await AuthService.register({ fullName, email, password, userRole });
      
            return res.status(201).json({
              success: true,
              message: "User registered successfully",
              data: user,
            })
        } catch (err) {
            next(err);
        }
    }

    // LOGIN
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
    
            // Basic validation
            if (!email || !password) {
                return next(ApiError.badRequest("Email and password are required."));
            }
    
            const response = await AuthService.login({ email, password });
    
            return res.status(200).json({
                success: true,
                message: "Login successful",
                data: response
            });
    
        } catch (err) {
            next(err); // Pass to global handler
        }
    }
    
}

module.exports = AuthController;
