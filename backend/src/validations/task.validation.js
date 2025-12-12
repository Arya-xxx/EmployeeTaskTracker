const Joi = require("joi");

const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(null, "").optional(),
    assignedTo: Joi.number().required(),
    dueDate: Joi.date().required(),
    taskStatus: Joi.string()
        .valid("pending", "inProgress", "completed")
        .default("pending")
});

module.exports = { createTaskSchema };
