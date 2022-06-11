import request from 'supertest'
import { app } from '../../app'

it('should returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)
})

it('should returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'password'
    })
    .expect(400)
})

it('should returns a 400 with an invalid password length', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123'
    })
    .expect(400)
})

it('should returns a 400 with missing email and password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({})
    .expect(400)
})

it('should dissalow duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456'
    })
    .expect(400)
})

it('should sets a cookie after successful signup ', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: '123456'
    })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})