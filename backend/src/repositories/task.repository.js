const { Task } = require("../models");
const sequelize = require("../config/sequelize");

class TaskRepository {
    static async createTask(data) {
        return await Task.create(data);
    }

    static async findAll() {
        return await Task.findAll();
    }

    static async findByAssignedUser(userId) {
        return await Task.findAll({
            where: { assignedTo: userId }
        });
    }

    
    static async findById(id) {
        return await Task.findByPk(id);
    }

    static async getTasksByUserId(userId) {
        return await Task.findAll({
            where: { assignedTo: userId },
            attributes: [
                "id",
                "title",
                "description",
                "taskStatus",
                "dueDate",
                "createdAt",
                "updatedAt"
            ]
        });
    }

    static async updateTask(taskId, updateData) {
        await Task.update(updateData, { where: { id: taskId } });
        return this.findById(taskId); // return updated record
    }

    static async getUserByTaskId(taskId) {
        const [rows] = await sequelize.query(
            `
            SELECT 
                u.id AS userId,
                u.fullName,
                u.email,
                u.userRole,
                t.id AS taskId,
                t.title,
                t.description,
                t.taskStatus
            FROM tasks t
            INNER JOIN users u ON u.id = t.assignedTo
            WHERE t.id = ?
              AND t.deletedAt IS NULL
              AND u.deletedAt IS NULL
            `,
            { replacements: [taskId] }
        );
    
        return rows[0];
    }

    static async deleteTask(id) {
        return await Task.destroy({ where: { id } });  // soft delete (paranoid mode)
    }
    
}

module.exports = TaskRepository;
