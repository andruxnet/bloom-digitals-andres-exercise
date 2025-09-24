const express = require('express');

const Task = require('../models/task');
const { authenticateToken } = require('../middleware/auth-middleware');

const router = express.Router();

// Get all tasks for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a new task
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, status } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const task = new Task({
      name,
      description,
      status: status || 'pending',
      userId: req.user.userId
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { name, description, status } = req.body;
    const taskId = req.params.id;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user.userId },
      { name, description, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Toggle task status
router.patch('/:id/toggle', authenticateToken, async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findOne({ _id: taskId, userId: req.user.userId });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();
    res.json(task);
  } catch (error) {
    console.error('Error toggling task status:', error);
    res.status(500).json({ error: 'Failed to toggle task status' });
  }
});

module.exports = router;


