import React, { useState } from 'react';
import './TaskCard.css'


const TaskCard = ({ task, index, toggleTask, deleteTask, editTask }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleEditSave = () => {
    editTask(index, { name: editedName, description: editedDescription });
    setEditMode(false);
  };

  return (
    <>
      {editMode ? (
        <>
          <div className="col-4">
            <div className="card editcard">
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </div>
              <button onClick={handleEditSave}>Save</button>
            </div>
          </div>

        </>
      ) : (
        <>
          <div className="col-4">
            <div className="card">
              <h4>Name:{task.name}</h4>
              <p>Description:{task.description}</p>
              <p>Status:
                <select value={task.completed} onChange={() => toggleTask(index)}>
                  <option value={false}>Incomplete</option>
                  <option value={true}>Complete</option>
                </select>
              </p>
              <div className="buttons">
                <button className='delete' onClick={() => deleteTask(index)}>Delete</button>
                <button className='edit' onClick={() => setEditMode(true)}>Edit</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TaskCard;