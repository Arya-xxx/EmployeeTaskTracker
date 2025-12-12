const { User, sequelize } = require("../models");

class AuthRepository {
    
    // Create a user
    static async createUser(data) {
        return await User.create(data);
    }

    // Find user by email
    static async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    // Raw query (optionally)
    static async rawFindByEmail(email) {
        const [rows] = await sequelize.query(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            { replacements: [email] }
        );
        return rows[0];
    }
}

module.exports = AuthRepository;
