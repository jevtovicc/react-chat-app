import express from 'express';
import * as userController from '../controllers/user'

export const router = express.Router();

// GET api/users/
router.get('/', userController.getAllUsers)

// GET api/users/1
router.get('/:userId', userController.getUser)

router.post('/sendFriendRequest', userController.sendFriendRequest)
