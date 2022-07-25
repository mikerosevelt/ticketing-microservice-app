import { requireAuth, NotFoundError, NotAuthorizedError } from '@au_ah_gelap/common'
import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { Order, OrderStatus } from '../models/order'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.delete('/api/orders/:id', requireAuth,
async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)

  if (!order) throw new NotFoundError()

  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError()

  order.status = OrderStatus.CANCELLED
  await order.save()

  res.status(204).send({})
})

export { router as deleteOrderRouter }