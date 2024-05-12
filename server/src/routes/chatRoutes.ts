import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getMessages, sendMessage , getMessagesBetweenUsers} from '../controllers/chatController';

const router = express.Router();

router.get('/:userId', authMiddleware, getMessages);
router.post('/', authMiddleware, sendMessage);
router.post('/between/:senderId', authMiddleware, getMessagesBetweenUsers);
export default router;