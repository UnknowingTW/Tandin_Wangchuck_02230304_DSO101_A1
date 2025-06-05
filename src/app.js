const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Function to safely read Docker secrets
function readSecret(secretName) {
  try {
    const secretPath = `/run/secrets/${secretName}`;
    
    // Check if running in Docker with secrets
    if (fs.existsSync(secretPath)) {
      const secret = fs.readFileSync(secretPath, 'utf8').trim();
      console.log(`✅ Secret '${secretName}' loaded from Docker secrets`);
      return secret;
    }
    
    // Fallback for development (environment variables)
    const envSecret = process.env[secretName.toUpperCase()];
    if (envSecret) {
      console.log(`✅ Secret '${secretName}' loaded from environment`);
      return envSecret;
    }
    
    // Final fallback
    console.log(`⚠️ Secret '${secretName}' not found, using default`);
    return 'default-value';
    
  } catch (error) {
    console.error(`❌ Error reading secret '${secretName}':`, error.message);
    return 'default-value';
  }
}

// Load secrets at startup
const dbPassword = readSecret('db_password');
const apiKey = readSecret('api_key');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Todo App with Docker Secrets',
    timestamp: new Date().toISOString(),
    user: process.getuid ? `UID: ${process.getuid()}` : 'Unknown',
    secrets_status: {
      db_password: dbPassword !== 'default-value' ? '✅ Loaded' : '❌ Missing',
      api_key: apiKey !== 'default-value' ? '✅ Loaded' : '❌ Missing'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Todo routes (example)
app.get('/todos', (req, res) => {
  // Use the secrets in your application logic
  console.log('DB Password available:', dbPassword !== 'default-value');
  console.log('API Key available:', apiKey !== 'default-value');
  
  res.json({
    todos: [
      { id: 1, text: 'Learn Docker Secrets', completed: true },
      { id: 2, text: 'Implement CI/CD', completed: false }
    ]
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Running as user: ${process.getuid ? process.getuid() : 'N/A'}`);
  console.log(`🔐 Secrets loaded: DB=${dbPassword !== 'default-value'}, API=${apiKey !== 'default-value'}`);
});