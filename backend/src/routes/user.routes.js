const express = require("express");
const router = express.Router();

console.log("user route loaded");

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const { UserController } = require("../controllers");

console.log(UserController);

// ========================
// GET ALL USERS (ADMIN ONLY)
// ========================

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    UserController.getAllUsers
);

router.get(
    "/:id/tasks",
    authMiddleware,
    UserController.getUserTasks
);

router.put("/:id", authMiddleware, UserController.updateUser);

// DELETE USER
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), UserController.deleteUser);


// router.get(
//     "/",
//     authMiddleware,            // Must be logged in
//     roleMiddleware(["admin"]), // Must have admin role
//     UserController.getAllUsers
// );

module.exports = router;
