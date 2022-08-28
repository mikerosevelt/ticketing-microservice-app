import {
  requireAuth,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
  currentUser,
} from '@au_ah_gelap/common';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/order';

const router = express.Router();

router.post(
  '/api/orders/:id',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw new BadRequestError('Invalid order Id');

    const order = await Order.findById(req.params.id).populate('ticket');

    if (!order) throw new NotFoundError();

    if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError();

    res.send('Show');
  }
);

export { router as showOrderRouter };
