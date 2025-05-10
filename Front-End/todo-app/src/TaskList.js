import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ tasks }) => {
  const navigate = useNavigate();

  const handleClick = (task) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    navigate(`/task/${task.id}`);
  };

  return (
    <ul>
      {tasks.map(task => (
        <li
          key={task.id}
          onClick={() => handleClick(task)}
          className="cursor-pointer hover:underline mb-2"
        >
          {task.description}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;