import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMesseges, getUsersForSidebar, sendMessage} from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', protectRoute, getUsersForSidebar);
router.get('/:id', protectRoute, getMesseges);
router.get('/send/:id', protectRoute, sendMessage);

export default router;
