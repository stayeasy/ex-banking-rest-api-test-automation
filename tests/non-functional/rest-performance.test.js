const request = require('supertest');
const { app } = require('../../src/ex-banking-rest-api');

describe('REST API Performance Tests', () => {
    test('Performance of user creation', async () => {
        const NUM_OPERATIONS = 100;
        const startTime = performance.now();

        for (let i = 0; i < NUM_OPERATIONS; i++) {
            const username = `perf_user_${i}_${Date.now()}`;
            await request(app)
                .post('/users')
                .send({ username });
        }

        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`Time to create ${NUM_OPERATIONS} users: ${duration}ms`);

        expect(duration).toBeLessThan(5000);
    });

    test('Performance of deposit operations', async () => {
        const NUM_OPERATIONS = 100;
        const username = `perf_deposit_${Date.now()}`;

        // Create initial user
        await request(app)
            .post('/users')
            .send({ username });

        const startTime = performance.now();

        for (let i = 0; i < NUM_OPERATIONS; i++) {
            await request(app)
                .post('/deposit')
                .send({ 
                    username, 
                    amount: 10 
                });
        }

        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log(`Time to perform ${NUM_OPERATIONS} deposits: ${duration}ms`);

        expect(duration).toBeLessThan(5000);
    });
});