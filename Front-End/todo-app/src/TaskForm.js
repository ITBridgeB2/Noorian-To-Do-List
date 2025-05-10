import React, { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    onAdd({ description });
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="New Task Description"
        className="border p-2 w-full mb-2"
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;