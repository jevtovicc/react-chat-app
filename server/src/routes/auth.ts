import express from 'express';
import * as authController from '../controllers/auth'

export const router = express.Router();

// POST api/auth/signup
router.post('/signup', authController.signup)

// POST api/auth/login
router.post('/login', authController.login)
