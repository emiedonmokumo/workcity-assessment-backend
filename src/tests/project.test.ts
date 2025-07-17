import request from 'supertest';
import app from '../app';
import connectDB, { disconnectDB } from '../config/db';
import Project from '../models/Project';
import Client from '../models/Client';
import User from '../models/User';

describe('Project Routes', () => {
  let token: string;
  let clientId: string;
  let projectId: string;

  beforeAll(async () => {
    await connectDB();

    // Create admin user
    await request(app).post('/api/auth/signup').send({
      name: 'Admin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
    });

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'admin@test.com',
      password: 'password123',
    });

    token = loginRes.body.token;

    // Create client
    const clientRes = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Client',
        email: 'client@example.com',
      });

    clientId = clientRes.body._id;
  });

  afterAll(async () => {
    // await Project.deleteMany({});
    // await Client.deleteMany({});
    // await User.deleteMany({});
    await disconnectDB();
  });

  it('should create a project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Project',
        description: 'This is a test project',
        client: clientId,
        budget: 100000,
        status: 'Ongoing',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('New Project');
    expect(res.body).toHaveProperty('_id');
    expect(res.body.status).toBe('Ongoing');
    projectId = res.body._id;
  });

  it('should get all projects', async () => {
    const res = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get projects by client', async () => {
    const res = await request(app)
      .get(`/api/projects/client/${clientId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].client).toBe(clientId);
  });

  it('should update a project', async () => {
    const res = await request(app)
      .put(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Project Title',
        status: 'Completed',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Project Title');
    expect(res.body.status).toBe('Completed');
  });

  it('should delete a project', async () => {
    const res = await request(app)
      .delete(`/api/projects/${projectId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
