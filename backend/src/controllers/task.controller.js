const{ TaskService } = require("../services");
const ApiError = require("../middleware/ApiError");

class TaskController {
    static async createTask(req, res, next) {
        try {
            const { title, description, assignedTo, dueDate, taskStatus } = req.body;

            const task = await TaskService.createTask({
                title,
                description,
                assignedTo,
                dueDate,
                taskStatus
            });

            return res.status(201).json({
                success: true,
                message: "Task created successfully",
                data: task
            });
        } catch (err) {
            next(err);
        }
    }

    static async getTasks(req, res, next) {
        try {
            const tasks = await TaskService.getTasksForUser(req.user);
    
            return res.status(200).json({
                success: true,
                data: tasks
            });
        } catch (err) {
            next(err);
        }
    }


    static async getTask(req, res, next) {
        try {
            const taskId = req.params.id;
            const task = await TaskService.getTaskById(taskId, req.user);
    
            return res.status(200).json({
                success: true,
                data: task
            });
    
        } catch (err) {
            next(err);
        }
    }

    static async updateTask(req, res, next) {
        try {
            const taskId = req.params.id;
            const updates = req.body;

            const updatedTask = await TaskService.updateTask(req.user, taskId, updates);

            return res.status(200).json({
                success: true,
                data: updatedTask
            });

        } catch (err) {
            next(err);
        }
    }

    static async getUserByTask(req, res, next) {
        try {
            const taskId = req.params.id;
    
            const user = await TaskService.getUserByTaskId(req.user, taskId);
    
            return res.status(200).json({
                success: true,
                data: user
            });
    
        } catch (err) {
            next(err);
        }
    }

    static async deleteTask(req, res, next) {
        try {
            const taskId = req.params.id;

            const result = await TaskService.deleteTask(req.user, taskId);

            return res.status(200).json({
                success: true,
                message: result.message
            });

        } catch (err) {
            next(err);
        }
    }
    
    
    
}

module.exports = TaskController;
