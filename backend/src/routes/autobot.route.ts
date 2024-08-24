import express from 'express';
import { AutobotController } from '../controller/Autobot.controller';
import { rateLimiterMiddleware } from '../utils/ratelimiter.utils';

const router = express.Router();

router.use(rateLimiterMiddleware);

router.get('/autobots', AutobotController.getAutobots);
router.get('/autobots/:autobotId/posts', AutobotController.getAutobotPosts);
router.get('/posts/:postId/comments', AutobotController.getPostComments);
router.get('/autobot-count', AutobotController.getAutobotCount);
router.get('/start-autobot-generation',AutobotController.startCreation)
router.get('/stop-autobot-generation', AutobotController.stopCreation)
router.get('/reset-database', AutobotController.resetDb)


export default router;