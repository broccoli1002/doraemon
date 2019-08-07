// jest.config.js
const request = require('supertest');
const app = require('./app')

describe('Test getImage', () => {
    test('It should response statusCode 200', async(done) => {
        const response = await request(app).get('/image/12345');
        expect(response.statusCode).toBe(200);
        done();
    });
});

describe('Test postImage', () => {
    const filePath = `${__dirname}/testFiles/test.jpg`;
    test('It should response statusCode 200', async(done) => {
        const response = await request(app).post('/image').attach('file', filePath);
        expect(response.statusCode).toBe(200);
        done();
    });
})
