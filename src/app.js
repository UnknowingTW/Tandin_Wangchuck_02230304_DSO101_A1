const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Simple in-memory todos for CI/CD testing
let todos = [
  { id: 1, text: 'Complete DSO101 Assignment 1', completed: true },
  { id: 2, text: 'Setup Jenkins CI/CD Pipeline', completed: false },
  { id: 3, text: 'Deploy Todo App', completed: false }
];

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Todo App CI/CD Pipeline - DSO101 Assignment 2',
    author: 'Tshering Wangchuck',
    endpoints: {
      todos: '/api/todos',
      health: '/health'
    }
  });
});

// Health check endpoint (useful for CI/CD)
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json({
    success: true,
    count: todos.length,
    data: todos
  });
});

// Add new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ 
      success: false, 
      error: 'Text is required' 
    });
  }
  
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };
  
  todos.push(newTodo);
  res.status(201).json({
    success: true,
    data: newTodo
  });
});

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Todo App CI/CD running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📝 Todos API: http://localhost:${PORT}/api/todos`);
  });
}

module.exports = app;