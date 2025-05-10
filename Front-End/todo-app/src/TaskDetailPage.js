import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const foundTask = storedTasks.find(t => t.id === Number(id));
    setTask(foundTask);
  }, [id]);

  const handleBack = () => navigate('/');

  if (!task) return <div>Task not found.</div>;

  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold mb-2">{task.title || 'Untitled Task'}</h2>
      <p className="mb-2">Description: {task.description}</p>
      <p className="mb-2">Due Date: {task.dueDate || 'Not set'}</p>
      <p className="mb-4">Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
      <button onClick={handleBack} className="bg-blue-500 text-white p-2 rounded">Back</button>
    </div>
  );
};

export default TaskDetailPage;