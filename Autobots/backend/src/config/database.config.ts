import { DataSource, DataSourceOptions } from 'typeorm';
import { Autobot } from '../models/Autobot.entity';
import { Post } from '../models/Post.entity';
import { Comment } from '../models/Comment.entity';
import { createConnection } from 'mysql2/promise';
import databaseConfig from './config.development';

// Get the database configuration
const dbConfig = databaseConfig().database;

// Define the DataSource options explicitly for MySQL
const dataSourceOptions: DataSourceOptions = {
  type: 'mysql', // Explicitly state the type to avoid confusion
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [Autobot, Post, Comment],
  synchronize: false,
  logging: false,
};

// Create the DataSource instance
export const AppDataSource = new DataSource(dataSourceOptions);

export const createDatabaseConnection = async (): Promise<DataSource> => {
  try {
    // Step 1: Connect to MySQL server without a specific database
    const connection = await createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.username,
      password: dbConfig.password,
    });

    // Step 2: Check if the database exists and create it if not
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    await connection.end(); // Close the connection

    // Step 3: Initialize TypeORM with the specific database
    await AppDataSource.initialize();
    console.log('Database connected!');
    return AppDataSource;
  } catch (error) {
    console.error('Error during Data Source initialization', error);
    throw error;
  }
};
