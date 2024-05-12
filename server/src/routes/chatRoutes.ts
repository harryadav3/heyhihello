import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getMessages, sendMessage } from '../controllers/chatController';

const router = express.Router();

router.get('/:userId', authMiddleware, getMessages);
router.post('/', authMiddleware, sendMessage);

export default router;