const { User } = require("../models");

class UserRepository {
    static async findAll() {
        return await User.findAll({
            attributes: ["id", "fullName", "email", "userRole", "createdAt"]
        });
    }

    static async findById(id) {
        return await User.findByPk(id);
    }

    static async deleteUser(id) {
        return await User.destroy({ where: { id } }); // soft delete because paranoid=true
    }

    static async updateUser(id, data) {
        await User.update(data, { where: { id } });
        return this.findById(id);
    }
}

module.exports = UserRepository;
