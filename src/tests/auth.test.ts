import request from 'supertest';
import app from '../app';
import connectDB, { disconnectDB } from '../config/db';

describe('Auth Routes', () => {
    beforeAll(async () => {
        await connectDB();
      });
    
      afterAll(async () => {
        await disconnectDB();
      });

    const testUser = {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'user',
    };

    describe('POST /api/auth/signup', () => {
        it('should register a new user and return a token', async () => {
            const res = await request(app).post('/api/auth/signup').send(testUser);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toMatchObject({
                name: testUser.name,
                email: testUser.email,
                role: testUser.role,
            });
        });

        it('should not allow duplicate email registration', async () => {
            const res = await request(app).post('/api/auth/signup').send(testUser);

            expect(res.statusCode).toBe(400);
            expect(res.body.msg).toMatch(/email already in use/i);
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login with correct credentials and return a token', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: testUser.password,
                });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body.user.email).toBe(testUser.email);
        });

        it('should fail login with wrong password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: testUser.email,
                    password: 'wrongpassword',
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.msg).toMatch(/invalid credentials/i);
        });

        it('should fail login with non-existing user', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'irrelevant',
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.msg).toMatch(/invalid credentials/i);
        });
    });
});