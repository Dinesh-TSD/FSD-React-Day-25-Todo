import React, { useState, useEffect } from 'react';
import TaskCard from './components/TaskCard';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'


const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { name: taskInput, description: descriptionInput, completed: false }]);
      setTaskInput('');
      setDescriptionInput('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const editTask = (index, editedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], ...editedTask };
    setTasks(updatedTasks);
  };

  const filterTasks = () => {
    switch (filter) {
      case 'completed':
        return tasks.filter((task) => task.completed);
      case 'active':
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  useEffect(() => {
    // You can save tasks to localStorage or send them to a server here
    // For simplicity, I'm just logging the tasks to the console
    console.log('Tasks:', tasks);
  }, [tasks]);

  return (
    <div>
      <div className="container-fluid">
        <h1>React Todo List</h1>
      </div>
      <div className="container form">
        <div className="row">
          <div className='col-4'>
            <input
              type="text"
              placeholder="Task name"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
          </div>
          <div className='col-4'>
            <input
              type="text"
              placeholder="Task description"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </div>
          <div className="col-4">
            <button onClick={addTask}>Add Task</button>
          </div>
        </div>
      </div>

      <div className="container list">
        <div className="row">
          <div className="col-6 list-head">
            <h4>Todo List</h4>
          </div>
          <div className="col-6 filter">
            <label>Status Filter:</label>
            <select onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="active">Incompleted</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container todo-list">
        <div className='row'>
          {filterTasks().map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              index={index}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />

          ))}
        </div>
      </div>

    </div>
  );
};

export default TodoApp;
