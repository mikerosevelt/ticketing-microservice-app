import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { body } from 'express-validator'
import { validateRequest, BadRequestError } from '@au_ah_gelap/common'

import { User } from "../models/User";
import { Password } from "../services/password";

const router = express.Router();

router.post('/api/users/signin', [
body('email')
.isEmail()
.withMessage('Email must be valid'),
body('password')
.trim().notEmpty().withMessage('You must supply a password')
],
validateRequest,
async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email })
  if(!existingUser) {
    throw new BadRequestError('Bad credentials!');
  }

  const passwordMatch = await Password.compare(existingUser.password, password)

  if(!passwordMatch) {
    throw new BadRequestError('Bad credentials!');
  }

 // Generate JWT
 const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY!);

  req.session = {
    jwt: userJwt
  };

  res.status(200).send(existingUser);
});

export { router as signInRouter };