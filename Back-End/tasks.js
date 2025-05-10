const express = require('express');
const router = express.Router();
const db = require('./db');

// Create a new task
router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  db.query(
    'INSERT INTO tasks (title, description) VALUES (?, ?)',
    [title, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        id: result.insertId,
        title,
        description,
        completed: false,
        created_at: new Date()
      });
    }
  );
});

// Get all tasks
router.get('/', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Update a task
router.put('/:id', (req, res) => {
  const { title, description, completed } = req.body;
  const { id } = req.params;

  db.query(
    'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
    [title, description, completed, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });

      res.json({ id: Number(id), title, description, completed, created_at: new Date() });
    }
  );
});

// Delete a task
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });

    res.status(204).send();
  });
});

module.exports = router;
