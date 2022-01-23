import express from 'express';
import * as userController from '../controllers/user'
import { authenticateToken } from '../middleware/jwt';

export const router = express.Router();

// GET api/users/
router.get('/', userController.getAllUsers)

// GET api/users/findByUsername?username=Elon
router.get('/findByUsername', userController.findUserByUsername)

// GET api/users/1
router.get('/:userId', userController.getUser)

router.post('/sendFriendRequest', authenticateToken, userController.sendFriendRequest)
