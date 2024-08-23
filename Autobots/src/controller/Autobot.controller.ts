import { Request, Response } from 'express';
import { AutobotService } from '../service/Autobot.service'; // Import your AutobotService

export class AutobotController {
  private static autobotService = AutobotService.getInstance(); // Use the service instance

  public static async getAutobots(req: Request, res: Response): Promise<void> {
    try {
     
      const autobots = await AutobotController.autobotService.getAutobots();
      res.json(autobots);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching autobots', error });
    }
  }

  public static async getAutobotPosts(req: Request, res: Response): Promise<void> {
    try {
      const autobotId = req.params.autobotId;
      const posts = await AutobotController.autobotService.getAutobotPosts(autobotId);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts for autobot', error });
    }
  }

  public static async getPostComments(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.postId;
      const comments = await AutobotController.autobotService.getPostComments(postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching comments for post', error });
    }
  }

  public static async getAutobotCount(req: Request, res: Response): Promise<void> {
    try {
      const count = await AutobotController.autobotService.getAutobotCount();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching autobot count', error });
    }
  }
}
