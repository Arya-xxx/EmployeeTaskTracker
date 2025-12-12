const { UserService } = require("../services");
const ApiError = require("../middleware/ApiError");

class UserController {
    static async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers();

            return res.status(200).json({
                success: true,
                data: users
            });
        } catch (err) {
            next(err);
        }
    }

    static async getUserTasks(req, res, next) {
        try {
            const targetId = req.params.id;
            const tasks = await UserService.getTasksForUser(req.user, targetId);

            return res.status(200).json({
                success: true,
                data: tasks
            });
        } catch (err) {
            next(err);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const targetUserId = req.params.id;

            const result = await UserService.deleteUser(req.user, targetUserId);

            res.status(200).json({
                success: true,
                message: result.message
            });

        } catch (err) {
            next(err);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const targetUserId = req.params.id;

            const updated = await UserService.updateUser(req.user, targetUserId, req.body);

            res.status(200).json({
                success: true,
                data: updated
            });

        } catch (err) {
            next(err);
        }
    }


}

module.exports = UserController;
