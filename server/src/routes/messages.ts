import express from 'express'
import * as messagesController from '../controllers/messages'

export const router = express.Router();

// GET /api/messageThreads/
router.get('/', messagesController.getAllMessageThreads)

router.post('/', messagesController.createMessageThread)

router.post('/', messagesController.addMessage)
