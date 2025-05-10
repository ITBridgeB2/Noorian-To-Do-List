import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ToDoList from './ToDoList';
import TaskDetail from './TaskDetail';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editing, setEditing] = useState(false);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (task) => {
    const res = await axios.post('http://localhost:5000/tasks', task);
    setTasks([...tasks, res.data]);
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
    setSelectedTask(null);
  };

  const handleUpdateTask = async (updatedTask) => {
    await axios.put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask);
    fetchTasks();
    setSelectedTask(null);
    setEditing(false);
  };

  const handleCompleteTask = async (id) => {
    await axios.patch(`http://localhost:5000/tasks/${id}/complete`);
    fetchTasks();
  };

  return (
    <div className="main-container">
      <div className="left-panel">
        {editing || !selectedTask ? (
          <ToDoList
            onAddTask={handleAddTask}
            existingTask={editing ? selectedTask : null}
            onUpdateTask={handleUpdateTask}
            cancelUpdate={() => setEditing(false)}
          />
        ) : (
          <TaskDetail
            task={selectedTask}
            onDelete={() => handleDeleteTask(selectedTask.id)}
            onEdit={() => setEditing(true)}
            onComplete={() => handleCompleteTask(selectedTask.id)}
          />
        )}
      </div>

      <div className="right-panel">
        <h3>All Tasks</h3>
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} onClick={() => { setSelectedTask(task); setEditing(false); }}>
              {task.title} {task.completed ? "(Done)" : ""}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;