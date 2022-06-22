import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import mongoose from 'mongoose'

it('should returns a 404 if the provided id does not exists', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'test',
      price: 20
    })
    .expect(404)
})

it('should returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'test',
      price: 20
    })
    .expect(401)
})

it('should returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'Test',
      price: 10
    })

    await request(app)
    .put(`/api/tickets${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'Test',
      price: 20
    })
    .expect(401)
})

it('should returns a 400 if the user provided an invalid title or price', async () => {
  const cookie = global.signin()
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Test',
      price: 10
    })

    await request(app)
    .put(`/api/tickets${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Test',
      price: 'awdadafwaf'
    })
    .expect(400)

    await request(app)
    .put(`/api/tickets${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      price: 10
    })
    .expect(400)
})

it('should updates the ticket if provided valid inputs', async () => {
  const cookie = global.signin()
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Test',
      price: 10
    })

  await request(app)
    .put(`/api/tickets${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Test',
      price: 20
    })
    .expect(200)

  const res = await request(app)
  .get(`/api/tickets/${response.body.id}`)
  .send()
  .expect(200)
  
  expect(res.body.price).toEqual(20)
})
