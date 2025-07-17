import request from 'supertest';
import app from '../app';

describe('GET /api/clients', () => {
  it('should return 401 if not authenticated', async () => {
    const res = await request(app).get('/api/clients');
    expect(res.statusCode).toBe(401);
  });
});