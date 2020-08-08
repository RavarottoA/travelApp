//const { app } = require('./app');
import { app } from "../server/server"
const request = require('supertest');

beforeAll(() => {
    process.env.NODE_ENV = 'test';
})

const res = request(app).get('/traerDatos');
expect(res).toBeDefined(); 