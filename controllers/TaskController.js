import Task from '../models/task.js';

class TaskController {
    static async createTask(req, res) {
        try {
            const { title } = req.body;
            const task = await Task.create({ title });
            
            return res.status(201).json({
                success: true,
                data: task
            });
        } catch (error) {
            console.error("Error occurred in createTask:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server error: Could not create the task.'
            });
        }
    }

    static async getTasks(req, res) {
        try {
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

    static async getSpecificTask(req, res) {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id);
            
            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            return res.json({
                success: true,
                data: task
            });
        } catch (error) {
            console.error("Error occurred in getSpecificTask:", error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server error: Could not retrieve the task.'
            });
        }
    }

    static async updateTasks(req, res) {
        try {
            const { id } = req.params;
            const { completed } = req.body;

            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }

            await task.update({ completed });
            
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