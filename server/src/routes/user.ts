import express from 'express';
import * as userController from '../controllers/user'

export const router = express.Router();

// GET api/users/
router.get('/', userController.getAllUsers)
