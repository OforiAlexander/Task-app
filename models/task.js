import { pool } from "../config/db.js";

class Task {
    static async create(title)
    {
        const query = {
            text: `INSERT INTO tasks(title) VALUES($1) RETURNING *`,
            values: [title]
        }
        try {
            const {rows} = await pool.query(query);
            return rows[0]
        }
        catch (error) {
            console.log("Error creating the task: ", error.message);
            throw new Error('Unable to create task due to an error');
        }
    } //This creates a new task

    static async getAllTasks()
    {
        const query = `SELECT * FROM tasks ORDER BY id`; //Query to get all the tasks and order them by the ASCE order.
        try {
            const {rows} = await pool.query(query);
            return rows; //return the results
        } catch (error) {
            console.log(`Error getting all tasks at: `, error.message);
            throw new Error("Fetching all tasks was not successfull");
        }
    } //Gets all the tasks to display

    static async getTaskById(id)
    {
        const query = {
            text: `SELECT * FROM tasks where id = $1`,
            values: [id]
        };
        try {
            const {rows} = await pool.query(query);
            if (rows.length === 0) {
                throw new Error(`Task with ID ${id} not found.`);
            }
            return rows[0];
        } catch (error) {
            console.error('Error getting the specified task by the ID at: ', error.message);
            throw new Error("Error occured whiles trying to fetch a task by the ID");
        }
    } // This gets all specified task through the id

    static async update(id, completed) {
        const query = {
            text: `UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING id`,
            values: [completed, id]  // Corrected: id should come after completed
        };
        try {
            const { rows } = await pool.query(query);
            if (rows.length === 0) {
                throw new Error(`Task with ID ${id} not found`);
            }
            return rows[0];
        } catch (error) {
            console.error(`Error updating task with ID ${id}: ${error.message}`);
            throw new Error("An error occurred while updating the task");
        }
    }   
     
    static async delete(id) {  // Corrected: add 'id' parameter
        const query = {
            text: `DELETE FROM tasks WHERE id = $1 RETURNING id`,
            values: [id]
        };
        try {
            const { rows } = await pool.query(query);
            if (rows.length === 0) {
                throw new Error(`Task with ID ${id} not found`);
            }
            return true;
        } catch (error) {
            console.error(`Error deleting task with ID ${id}: ${error.message}`);
            throw new Error("Could not delete task due to an error");
        }
    }
    
}

export default Task;