const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'noor', // Replace with your MySQL password
  database: 'todo_app'
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Add a task
app.post('/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;
  db.query('INSERT INTO tasks (title, description, dueDate) VALUES (?, ?, ?)', 
    [title, description, dueDate], 
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, title, description, dueDate, completed: false });
    }
  );
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const { title, description, dueDate } = req.body;
  db.query('UPDATE tasks SET title=?, description=?, dueDate=? WHERE id=?',
    [title, description, dueDate, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.sendStatus(200);
    }
  );
});

// Mark completed
app.patch('/tasks/:id/complete', (req, res) => {
  db.query('UPDATE tasks SET completed=1 WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  db.query('DELETE FROM tasks WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(200);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});