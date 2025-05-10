import React from 'react';
import './TaskDetail.css';

const TaskDetail = ({ task, onDelete, onEdit, onComplete }) => {
  return (
    <div className="task-detail-container">
      <input type="text" value={task.title} readOnly />
      <input type="text" value={task.description} readOnly />
      <input type="date" value={task.dueDate} readOnly />
      <button className="completed" onClick={onComplete}>Completed</button>
      <button className="delete" onClick={onDelete}>Delete</button>
      <button className="update" onClick={onEdit}>Update</button>
    </div>
  );
};

export default TaskDetail;