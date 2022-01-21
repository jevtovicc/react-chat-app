import express from 'express'
import * as messagesController from '../controllers/messages'
import { authenticateToken } from '../middleware/jwt';

export const router = express.Router();

// GET /api/messageThreads/
router.get('/', authenticateToken, messagesController.getAllMessageThreads)

router.post('/', authenticateToken, messagesController.createMessageThread)

router.post('/', authenticateToken, messagesController.addMessage)

router.post('/:messageThreadId/addParticipants', authenticateToken, messagesController.addParticipantsToMessageThreads)
