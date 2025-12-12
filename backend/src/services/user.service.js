const { UserRepository, TaskRepository } = require("../repositories");
const ApiError = require("../middleware/ApiError");
class UserService {
    static async getAllUsers() {
        return await UserRepository.findAll();
    }

    static async getTasksForUser(requestingUser, targetUserId) {
        
        // Check if target user exists
        const targetUser = await UserRepository.findById(targetUserId);
        if (!targetUser) {
            throw ApiError.notFound("User not found.");
        }

        // Admin → can see all
        if (requestingUser.role === "admin") {
            return await TaskRepository.getTasksByUserId(targetUserId);
        }

        // Employee → ONLY own tasks
        if (requestingUser.id != targetUserId) {
            throw ApiError.forbidden("You cannot view another user's tasks.");
        }

        // Employee accessing own tasks
        return await TaskRepository.getTasksByUserId(requestingUser.id);
    }

    static async deleteUser(requestingUser, targetUserId) {

        const targetUser = await UserRepository.findById(targetUserId);
        if (!targetUser) {
            throw ApiError.notFound("User not found");
        }

        // Employee cannot delete ANYONE
        if (requestingUser.role === "employee") {
            throw ApiError.forbidden("Employees are not allowed to delete users.");
        }

        // Admin cannot delete himself
        if (requestingUser.role === "admin" && requestingUser.id == targetUserId) {
            throw ApiError.forbidden("Admin cannot delete himself.");
        }

        await UserRepository.deleteUser(targetUserId);

        return { message: "User deleted successfully" };
    }

    static async updateUser(requestingUser, targetUserId, updateData) {

        const targetUser = await UserRepository.findById(targetUserId);
        if (!targetUser) {
            throw ApiError.notFound("User not found");
        }

        // Employee → can ONLY update himself
        if (requestingUser.role === "employee") {
            if (requestingUser.id != targetUserId) {
                throw ApiError.forbidden("Employees can only update their own profile.");
            }
        }

        // Admin → allowed for any user (including himself)

        const updatedUser = await UserRepository.updateUser(targetUserId, updateData);

        return updatedUser;
    }
}

module.exports = UserService;
