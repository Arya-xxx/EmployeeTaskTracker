const ApiError = require("../middleware/ApiError");
const { TaskRepository } = require("../repositories");
const { UserRepository } = require("../repositories");

class TaskService {
    static async createTask(data) {
        // Check if assigned user exists
        const user = await UserRepository.findById(data.assignedTo);

        if (!user) {
            throw ApiError.notFound("Assigned user does not exist.");
        }

        // Create task
        const task = await TaskRepository.createTask(data);

        return task;
    }

    static async getTasksForUser(user) {
        // Admin → can see all tasks
        if (user.role === "admin") {
            return await TaskRepository.findAll();
        }

        // Employee → only tasks assigned to him
        return await TaskRepository.findByAssignedUser(user.id);
    }

    static async getTaskById(taskId, user) {
        const task = await TaskRepository.findById(taskId);

        if (!task) {
            throw ApiError.notFound("Task not found.");
        }

        // Admin can access any task
        if (user.role === "admin") {
            return task;
        }

        // Employee can only access their own tasks
        if (task.assignedTo !== user.id) {
            throw ApiError.forbidden("You are not allowed to view this task.");
        }

        return task;
    }

    static async updateTask(requestingUser, taskId, updates) {
        
        const task = await TaskRepository.findById(taskId);

        if (!task) {
            throw ApiError.notFound("Task not found.");
        }

        // ADMIN → can edit any task
        if (requestingUser.role === "admin") {
            return await TaskRepository.updateTask(taskId, updates);
        }

        // EMPLOYEE → can edit only own task
        if (task.assignedTo !== requestingUser.id) {
            throw ApiError.forbidden("You are not allowed to update this task.");
        }

        return await TaskRepository.updateTask(taskId, updates);
    }

    static async getUserByTaskId(requestingUser, taskId) {
        const result = await TaskRepository.getUserByTaskId(taskId);

        if (!result) {
            throw ApiError.notFound("Task not found or user does not exist.");
        }

        // Whether result is Sequelize (result.User) or raw query (result.assignedTo)
        const assignedUserId = result.assignedTo || (result.User && result.User.id);

        // ====== ACCESS CHECKS ======
        // Admin → can access any task
        if (requestingUser.role !== "admin") {
            // Employee → can only access task if assigned to them
            if (assignedUserId !== requestingUser.id) {
                throw ApiError.forbidden("You are not allowed to access this task's user details.");
            }
        }

        // ====== RESPONSE FORMAT ======

        // Sequelize JOIN version
        if (result.User) {
            return result.User;
        }

        // RAW SQL version (map to user object)
        return {
            id: result.userId,
            fullName: result.fullName,
            email: result.email,
            userRole: result.userRole,
        };
    }

    static async deleteTask(requestingUser, taskId) {
        
        const task = await TaskRepository.findById(taskId);
        if (!task) {
            throw ApiError.notFound("Task not found.");
        }

        // ONLY admin can delete tasks
        if (requestingUser.role !== "admin") {
            throw ApiError.forbidden("Only admins are allowed to delete tasks.");
        }

        await TaskRepository.deleteTask(taskId);

        return { message: "Task deleted successfully." };
    }
}

module.exports = TaskService;
