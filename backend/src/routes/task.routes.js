const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const validate = require("../middleware/validate");

const { TaskController } = require("../controllers");
const { createTaskSchema } = require("../validations/task.validation");

// POST /tasks → Admin-only create task
router.post(
    "/",
    authMiddleware,              // 🔐 must be logged in
    roleMiddleware(["admin"]),   // 👮 admin only
    validate(createTaskSchema),  // 📦 validation
    TaskController.createTask
);

router.get(
    "/",
    authMiddleware,        // token required
    TaskController.getTasks
);

router.get(
    "/:id",
    authMiddleware,
    TaskController.getTask
);

router.put("/:id", authMiddleware, TaskController.updateTask);

router.get("/:id/user", authMiddleware, TaskController.getUserByTask);

router.delete("/:id", roleMiddleware(["admin"]), TaskController.deleteTask);



module.exports = router;
