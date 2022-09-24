import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string;
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51HbKDeHWrTJmzf0UnPqNtY1ouVoooqRxRfNk8Yz1LIlaWheNKXbCIBUPHoppGhOdTw9j1KJYwXAAHnORh5SbNhrC00wNY1aFYd';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdasd';
  // mongo = new MongoMemoryServer();
  // const mongoUri = await mongo.getUri();
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // const email = 'test@test.com'
  // const password = '123456789'

  // const response = await request(app)
  //   .post('/api/users/signup')
  //   .send({ email, password })
  //   .expect(201)

  // const cookie = response.get('Set-Cookie')

  // return cookie

  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com'
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return `express:sess=${base64}`;
};
