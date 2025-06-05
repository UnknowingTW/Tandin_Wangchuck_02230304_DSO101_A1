
cat > tests/app.test.js << 'EOF'
// tests/app.test.js - Unit tests for CI/CD pipeline
const request = require('supertest');
const app = require('../src/app');

describe('Todo App API Tests', () => {
  
  test('should return app info on root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toContain('Todo App CI/CD Pipeline');
    expect(response.body.author).toBe('Tshering Wangchuck');
  });

  test('should return health status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
  });

  test('should get all todos', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.count).toBeGreaterThan(0);
  });

  test('should create a new todo', async () => {
    const newTodo = { text: 'Test todo from Jest' };
    const response = await request(app)
      .post('/api/todos')
      .send(newTodo);
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.text).toBe(newTodo.text);
    expect(response.body.data.completed).toBe(false);
  });

  test('should reject todo creation without text', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Text is required');
  });

  // Basic unit tests (non-API)
  test('should perform basic calculations', () => {
    expect(1 + 1).toBe(2);
    expect(2 * 3).toBe(6);
  });

  test('should handle todo object creation', () => {
    const todo = {
      id: 1,
      text: 'Learn Jenkins',
      completed: false
    };
    
    expect(todo.text).toBe('Learn Jenkins');
    expect(todo.completed).toBe(false);
    expect(typeof todo.id).toBe('number');
  });
});
EOF