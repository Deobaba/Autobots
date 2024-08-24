import { AppDataSource } from '../config/database.config'; 
import axios from 'axios';
import { Autobot } from '../models/Autobot.entity';
import { Post } from '../models/Post.entity';
import { Comment } from '../models/Comment.entity';
import { JsonPost } from '../Interface/Post.interface';
import {JsonUser} from '../Interface/User.interface'
import { JsonComment } from '../Interface/Comment.interface';
import { FetchType } from '../type';

export class AutobotService {
  private static instance: AutobotService;

  private constructor() {}

  public static getInstance(): AutobotService {
    if (!AutobotService.instance) {
      AutobotService.instance = new AutobotService();
    }
    return AutobotService.instance;
  }

  public async generateAutobotBatch(batchSize: number): Promise<void> {

    const autobotRepository = AppDataSource.getRepository(Autobot);
    const postRepository = AppDataSource.getRepository(Post);
    const commentRepository = AppDataSource.getRepository(Comment);

    // Create and save Autobots
    const autobots = await this.createAutobots();
    const savedAutobots = await autobotRepository.save(autobots);
    console.log(`Saved ${savedAutobots.length} Autobots.`);

    // Create and save Posts
    const posts = await this.createPosts(savedAutobots);
    const savedPosts = await postRepository.save(posts);
    console.log(`Saved ${savedPosts.length} Posts.`);

    // Create and save Comments
    const comments = await this.createComments(savedPosts);
    const savedComments = await commentRepository.save(comments);
    console.log(`Saved ${savedComments.length} Comments.`);

    console.log(`Generated ${batchSize} autobots with posts and comments.`);
  }

  private async createAutobots(): Promise<Autobot[]> {
    const response = await this.fetchdata('users')
    return response.data.map((userData:JsonUser) => {
      const autobot = new Autobot();
      Object.assign(autobot, userData);
      return autobot;
    });
  }

  private async createPosts(autobots: Autobot[]): Promise<Post[]> {
    const response = await this.fetchdata('posts') 
    return response.data.flatMap((postData : JsonPost, index:number) => {
      const autobot = autobots[Math.floor(index / 10)];
      const post = new Post();
      Object.assign(post, postData);
      post.title = `${post.title} ${Date.now()}-${index}`; // Ensure unique title
      post.autobot = autobot; // This will now have the database ID
      post.userId = autobot.userid
      return post;
    });
  }

  private async createComments(posts: Post[]): Promise<Comment[]> {
    const [response1, response2] = await Promise.all([
      this.fetchdata('comments'),
      this.fetchdata('comments')
  ]);

   // Concatenate the two arrays of comments
   const combinedCommentsData = response1.data.concat(response2.data);
   
    return combinedCommentsData.flatMap((commentData: JsonComment, index:number) => {
      const post = posts[Math.floor(index / 10)];
      const comment = new Comment();
      Object.assign(comment, commentData);
      comment.post = post; // This will now have the database ID
      comment.postid = post.postid
      return comment;
    });
  }

  private async fetchdata (fetch:FetchType){
    const response = await axios.get(`https://jsonplaceholder.typicode.com/${fetch}`);
    return response

  }

  public async getAutobots(): Promise<Autobot[]> {
    const autobotRepository = AppDataSource.getRepository(Autobot);
    const autobots = await autobotRepository.find({
      take: 10, // Fetch only the specified number of Autobots
    });
  
    return autobots;
  }

  public async getAutobotPosts(autobotId: string): Promise<Post[]> {
    const postRepository = AppDataSource.getRepository(Post);
    const posts = await postRepository.find({
      where: {
        autobot: { userid: autobotId }, // Ensure you're using the correct relation field
      },
      relations: ['autobot'], // Fetch associated Autobot data
      take: 10,
    });
    return posts;
  }

  public async getPostComments(postId: string): Promise<Comment[]> {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comments = await commentRepository.find({
      where: {
        post: { postid: postId }, // Ensure you're using the correct relation field
      },
      relations: ['post'], // Fetch associated Post data
      take: 10,
    });
    console.log(`Fetched ${comments.length} Comments for Post ID ${postId}.`);
    return comments;
  }

  public async getAutobotCount(): Promise<number> {
    const autobotRepository = AppDataSource.getRepository(Autobot);
    return autobotRepository.count();
  }

  public async resetDatabase(): Promise<void> {
   AppDataSource.getRepository(Comment);
   AppDataSource.getRepository(Post);
   AppDataSource.getRepository(Autobot);
  
    try {
      // Start a transaction
      await AppDataSource.transaction(async (transactionalEntityManager) => {
        // Disable foreign key checks
        await transactionalEntityManager.query('SET FOREIGN_KEY_CHECKS = 0;');
  
        // Delete records in the order of dependencies
        await transactionalEntityManager.clear(Comment);
        await transactionalEntityManager.clear(Post);
        await transactionalEntityManager.clear(Autobot);
  
        // Enable foreign key checks
        await transactionalEntityManager.query('SET FOREIGN_KEY_CHECKS = 1;');
      });
  
      console.log("Database has been reset successfully.");
    } catch (error) {
      console.error("Failed to reset the database:", error);
      throw new Error("Database reset failed.");
    }
  }
}
