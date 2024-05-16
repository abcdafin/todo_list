import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = () => {
    switch (filter) {
      case 'all':
        return tasks;
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'active':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Tambah tugas baru..."
          value={taskInput}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Tambah</button>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>Semua</button>
        <button onClick={() => setFilter('active')}>Belum Selesai</button>
        <button onClick={() => setFilter('completed')}>Selesai</button>
      </div>
      <ul className="task-list">
        {filteredTasks().map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTaskCompletion(task.id)}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
