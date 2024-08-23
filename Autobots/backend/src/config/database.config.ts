import { DataSource } from 'typeorm';
import databaseConfig from './config.development';
import { Autobot } from '../models/Autobot.entity';
import { Post } from '../models/Post.entity';
import { Comment } from '../models/Comment.entity';

// Get the database configuration
const dbConfig = databaseConfig().database;
console.log(dbConfig)
// Create the DataSource instance
export const AppDataSource = new DataSource({
  type: dbConfig.type as any, 
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [Autobot, Post, Comment],
  synchronize: true,
  logging: false,
});

// Function to initialize the connection
export const createDatabaseConnection = async (): Promise<DataSource> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected!');
    return AppDataSource;
  } catch (error) {
    console.error('Error during Data Source initialization', error);
    throw error;
  }
};
