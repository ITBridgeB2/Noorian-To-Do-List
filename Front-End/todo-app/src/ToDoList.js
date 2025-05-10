import React, { useState, useEffect } from 'react';
import './ToDoList.css';

const ToDoList = ({ onAddTask, existingTask, onUpdateTask, cancelUpdate }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  useEffect(() => {
    if (existingTask) {
      setTask(existingTask);
    }
  }, [existingTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (task.title && task.description && task.dueDate) {
      existingTask ? onUpdateTask(task) : onAddTask(task);
      setTask({ title: '', description: '', dueDate: '' });
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">{existingTask ? 'Update Task' : 'To-Do List'}</h1>
      <input name="title" value={task.title} onChange={handleChange} placeholder="Task Title" />
      <input name="description" value={task.description} onChange={handleChange} placeholder="Task Description" />
      <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
      <button onClick={handleSubmit}>{existingTask ? 'Update Task' : 'Add Task'}</button>
      {existingTask && <button onClick={cancelUpdate} className="cancel-button">Cancel</button>}
    </div>
  );
};

export default ToDoList;