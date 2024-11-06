import Task from '../models/task.js';

class TaskController {
    /**
     * Creates a new task in the database
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} - Response with a JSON object containing success status and created task data
     */
    static async createTask(req, res) {
        try {
            // Extract title from the request body
            const { title } = req.body;

            // Create a new task with the provided title
            const task = await Task.create({ title });
            
            // Respond with success status and created task data
            return res.status(201).json({
                success: true,
                data: task
            });
        } catch (error) {
            // Log error and respond with internal server error status
            console.error("Error occurred in createTask:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server error: Could not create the task.'
            });
        }
    }

    /**
     * Retrieves all tasks from the database
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} - Response with a JSON object containing success status and task data
     */
    static async getTasks(req, res) {
        try {
            // Retrieve all tasks ordered by ID in ascending order
            const tasks = await Task.findAll({
                order: [['id', 'ASC']]
            });
            
            return res.json({
                success: true,
                data: tasks
            });
        } catch (error) {
            console.error("Error occurred in getTasks:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server error: Could not retrieve tasks.'
            });
        }
    }


    /**
     * Updates the completed status of a task
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} - Response with a JSON object containing success status and updated task data
     */
    static async updateTasks(req, res) {
        try {
            const { id } = req.params; // Extract task ID from request parameters
            const { completed } = req.body; // Extract completed status from request body

            // Find the task by primary key (ID)
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            // Update the completed status of the task
            await task.update({ completed });
            
            // Respond with the updated task data
            return res.json({
                success: true,
                data: task
            });
        } catch (error) {
            console.error("Error occurred in updateTasks:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server error: Could not update the task.'
            });
        }
    }

    /**
     * Deletes a task from the database
     * @param {Object} req - Request object
     * @param {Object} res - Response object
     * @returns {Object} - Response with a JSON object containing success status and message
     */
    static async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id);
            
            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            // Delete the task
            await task.destroy();
            
            return res.json({
                success: true,
                message: 'Task has been deleted'
            });
        } catch (error) {
            console.error("Error occurred in deleteTask:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server error: Could not delete the task.'
            });
        }
    }

}

export default TaskController;