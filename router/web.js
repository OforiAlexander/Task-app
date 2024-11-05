import express from 'express';
import TaskController from '../controllers/TaskController.js';

const router = express.Router();

router.get('/tasks', TaskController.getTasks); //works

router.post('/tasks', TaskController.createTask); //works

router.get('/tasks/:id', TaskController.getSpecificTask); // works

router.patch('/tasks/:id', TaskController.updateTasks);

router.delete('/tasks/:id', TaskController.deleteTask);

export default router;