import Task from "../models/task.js";

class TaskController {
    static async createTask(req, res) {
        try {
            const { title } = req.body;
            if (!title || typeof title != 'string' || title.trim().length === 0) {
                return res.status(400).json({
                    success: false,
                    message: `Title required and must be a text or a string`
                });
            }
            const task = await Task.create(title.trim());
            return res.status(201).json({
                success: true,
                data: task
            });
        } catch (error) {
            console.error("Error occured in createTask and couldn't create the task", error);
            return res.status(500).json({
                success: false,
                message: `Internal Server error: Couldn't create the task.`
            });
        }
    } //This controller together with the model is responsible for finalising the creation of a task

    static async getTasks(req, res) {
        try {
            const result = await Task.getAllTasks();
            return res.json({
                success: true,
                data: result
            });
        } catch (error) {
            console.error(`Error occured in getTasks thus the results wasn't retrieved: ${error}`);
            return res.status(500).json({
                success: false,
                message: `Internal Server error thus the tasks weren't retrieved.`
            });
        }
    } //This controller method is to get all the task from the db

    static async getSpecificTask(req, res) {
        try {
            const id = parseInt(req.params.id); //convert the id to an integer
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid task ID`
                });
            }
            const task = await Task.getTaskById(id);
            return res.json({
                success: true,
                data: task
            });
        } catch (error) {
            if (error.message === `Task not found`) {
                return res.status(404).json({
                    success: false,
                    message: `Task not found`
                });
            }
            console.error("Error occured in getTask thus your specific task wasn't retrieved", error);
            return res.status(500).json({
                success: false,
                message: "Specified Task was not able to be retrieved from the db"
            });

        }
    } //This method is to get specific tasks by targeting the ids since it's unique

    static async updateTasks(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { completed } = req.body;

            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalide task ID`
                });
            }
            if (typeof completed !== 'boolean') {
                return res.status(400).json({
                    success: false,
                    message: `The status here must be either true or false`
                });

            }
            const task = await Task.update(id, completed);
            return res.json({
                success: true,
                data: task
            })
        } catch (error) {
            if (error.message === 'Task not found') {
                return res.status(404).json({
                    success: false,
                    message: 'Task not found'
                });
            }
            console.error('Error in updateTask:', error);
            return res.status(500).json({
                success: false,
                message: 'Could not update the specified task due to an error'
            });
        }
    } //This method is to update the requested task

    static async deleteTask(req, res)
    {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({
                    success: false,
                    message: `The ID is invalid and must be of type int`
                });
            }
            await Task.delete(id); //delete by targeting the id
            return res.json({
                success: true,
                message: `Task has been deleted`
            });
        } catch (error) {
            if (error.message === `Task not found`) {
                return res.status(404).json({
                    success: false,
                    message: `Task not found`
                });
            }
            console.error(`Error whiles deleting the task at Deletetasks: ${error}`);
            return res.status(500).json({
                success: false,
                message: `Task was not able to be deleted`
            });
            
        }
    }
}

export default TaskController;