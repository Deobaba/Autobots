import express from 'express';
import { AutobotController } from '../controller/Autobot.controller';
import { rateLimiterMiddleware } from '../utils/ratelimiter.utils';

const router = express.Router();

router.use(rateLimiterMiddleware);

router.get('/autobots', AutobotController.getAutobots);
router.get('/autobots/:autobotId/posts', AutobotController.getAutobotPosts);
router.get('/posts/:postId/comments', AutobotController.getPostComments);
router.get('/autobot-count', AutobotController.getAutobotCount);

export default router;