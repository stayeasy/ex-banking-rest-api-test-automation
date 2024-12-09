const request = require('supertest');
const { app } = require('../../src/ex-banking-rest-api');

describe('Deposit Functionnality', () => {
    let username;

    beforeEach(async () => {
        // Create a unique user before each test
        username = `user_${Date.now()}`;
        await request(app)
            .post('/users')
            .send({ username });
    });

    test('Should successfully deposit a positive amount', async () => {
        const amount = 100;
        const response = await request(app)
            .post('/deposit')
            .send({ username, amount });
        
        expect(response.statusCode).toBe(200);
        expect(response.body.newBalance).toBe(amount);
    });

    test('Should prevent deposit with zero amount', async () => {
        const amount = 0;
        const response = await request(app)
            .post('/deposit')
            .send({ username, amount });
        
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid deposit amount');
    });

    test('Should prevent deposit with negative amount', async () => {
        const amount = -50;
        const response = await request(app)
            .post('/deposit')
            .send({ username, amount });
        
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Invalid deposit amount');
    });

    test('Should prevent deposit for non-existent user', async () => {
        const nonExistentUser = `non_user_${Date.now()}`;
        const amount = 100;
        const response = await request(app)
            .post('/deposit')
            .send({ username: nonExistentUser, amount });
        
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('User not found');
    });

    test('Should prevent deposit without username', async () => {
        const amount = 100;
        const response = await request(app)
            .post('/deposit')
            .send({ amount });
        
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Username and amount are requiired');
    });

    test('Should prevent deposit without amount', async () => {
        const response = await request(app)
            .post('/deposit')
            .send({ username });
        
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Username and amount are requiired');
    });

    test('Should allow multiple deposits', async () => {
        const firstAmount = 100;
        const secondAmount = 50;

        // First deposit
        const firstResponse = await request(app)
            .post('/deposit')
            .send({ username, amount: firstAmount });
        
        expect(firstResponse.statusCode).toBe(200);
        expect(firstResponse.body.newBalance).toBe(firstAmount);

        // Second deposit
        const secondResponse = await request(app)
            .post('/deposit')
            .send({ username, amount: secondAmount });
        
        expect(secondResponse.statusCode).toBe(200);
        expect(secondResponse.body.newBalance).toBe(firstAmount + secondAmount);
    });
});