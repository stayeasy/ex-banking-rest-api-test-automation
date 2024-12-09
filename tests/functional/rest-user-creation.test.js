const request = require('supertest');
const { app } = require('../../src/ex-banking-rest-api');

describe('User Creation Functionnality', () => {
    test('Should create a new user successfully', async () => {
        const username = `user_${Date.now()}`;
        const response = await request(app)
            .post('/users')
            .send({ username });
        
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
    });

    test('Should prevent creating a duplicate user', async () => {
        const username = `duplicate_user_${Date.now()}`;
        
        // First creation should succeed
        await request(app)
            .post('/users')
            .send({ username });

        // Second creation should fail
        const response = await request(app)
            .post('/users')
            .send({ username });
        
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('User already exists');
    });
});