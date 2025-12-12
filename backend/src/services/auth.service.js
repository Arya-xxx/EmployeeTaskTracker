const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../middleware/ApiError");
const { AuthRepository } = require("../repositories");
const env = require("../config/env");

class AuthService {

    // REGISTER
    static async register({ fullName, email, password, userRole }) {
        // Check duplicate user
        const existing = await AuthRepository.findByEmail(email);
        if (existing) {
          throw ApiError.conflict("Email already registered.");
        }
    
        const hash = await bcrypt.hash(password, 10);
    
        const user = await AuthRepository.createUser({
          fullName,
          email,
          passwordHash: hash,
          userRole
        });
    
        return {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          userRole: user.userRole
        };
      }
    

    // LOGIN
    static async login({ email, password }) {
        // Find user
        const user = await AuthRepository.findByEmail(email);

        if (!user) {
            throw ApiError.unauthorized("Invalid email or password.");
        }

        // Password check
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw ApiError.unauthorized("Invalid email or password.");
        }

        // Token creation
        const token = jwt.sign(
            { id: user.id, role: user.userRole, fullName: user.fullName, email: user.email},
            env.jwtSecretKey,
            { expiresIn: "1d" }
        );

        return {
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.userRole
            }
        };
    }
}

module.exports = AuthService;
