import { requireAuth, NotFoundError, validateRequest, NotAuthorizedError } from '@au_ah_gelap/common'
import express, { Request, Response } from 'express'
import { body, ValidationError } from 'express-validator'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.put('/api/tickets:id', requireAuth, [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
],
validateRequest,
async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) throw new NotFoundError()

  if (req.currentUser!.id !== ticket.id) throw new NotAuthorizedError()

  ticket.set({
    title: req.body.title,
    price: req.body.price
  })

  await ticket.save()

  res.send(ticket)
})

export { router as updateTicketRouter }