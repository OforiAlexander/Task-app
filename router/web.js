import express from 'express';
import TaskController from '../controllers/TaskController.js';
import { validateCreateTask, validateUpdateTask, validateTaskId } from '../validate.js';

const router = express.Router();

router.get('/tasks', TaskController.getTasks);

router.post('/tasks', validateCreateTask, TaskController.createTask);

router.put('/tasks/:id', validateUpdateTask, TaskController.updateTasks);

router.delete('/tasks/:id', validateTaskId, TaskController.deleteTask);

export default router;