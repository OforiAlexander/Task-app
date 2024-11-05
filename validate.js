import { body, param } from 'express-validator';
import { validationResult } from 'express-validator';

export const validateCreateTask = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Your title should be a text')
        .isLength({ max: 255 })
        .withMessage('Enter a maximum of 255 charactors for your title'),
    handleValidationErrors
];

export const validateUpdateTask = [
    param('id')
        .isInt()
        .withMessage('Your task ID must be an integer'),
    body('completed')
        .isBoolean()
        .withMessage('Completed status must be a true or false'),
    handleValidationErrors
];

export const validateTaskId = [
    param('id')
        .isInt()
        .withMessage('Task ID must be an integer'),
    handleValidationErrors
];

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
}