import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const response = await axios.post(`${API_URL}/api/tasks`, {
        title: newTask
      });
      setTasks([response.data, ...tasks]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, title, completed) => {
    try {
      const response = await axios.put(`${API_URL}/api/tasks/${id}`, {
        title,
        completed
      });
      setTasks(tasks.map(task => 
        task.id === id ? response.data : task
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        
        <form onSubmit={addTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            style={{ padding: '10px', marginRight: '10px', width: '300px' }}
          />
          <button type="submit" style={{ padding: '10px 20px' }}>
            Add Task
          </button>
        </form>

        <div style={{ marginTop: '20px', width: '100%', maxWidth: '500px' }}>
          {tasks.map(task => (
            <div key={task.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '10px', 
              margin: '5px 0', 
              backgroundColor: '#f0f0f0',
              borderRadius: '5px'
            }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => updateTask(task.id, task.title, e.target.checked)}
                style={{ marginRight: '10px' }}
              />
              
              {editingTask === task.id ? (
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) => {
                    const updatedTasks = tasks.map(t => 
                      t.id === task.id ? { ...t, title: e.target.value } : t
                    );
                    setTasks(updatedTasks);
                  }}
                  onBlur={() => updateTask(task.id, task.title, task.completed)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      updateTask(task.id, task.title, task.completed);
                    }
                  }}
                  autoFocus
                  style={{ flexGrow: 1, padding: '5px' }}
                />
              ) : (
                <span
                  onClick={() => setEditingTask(task.id)}
                  style={{
                    flexGrow: 1,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                    color: task.completed ? '#888' : '#000'
                  }}
                >
                  {task.title}
                </span>
              )}
              
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}
export default App;
