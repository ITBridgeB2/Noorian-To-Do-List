import React, { useState } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTasks = [...tasks, { ...task, id: Date.now(), completed: false }];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return (
    <div>
      <div className="border p-4 mb-4">
        <h1 className="text-2xl font-bold mb-2">To-Do List</h1>
        <TaskList tasks={tasks} />
      </div>
      <div className="border p-4">
        <TaskForm onAdd={addTask} />
      </div>
    </div>
  );
};

export default TaskListPage;