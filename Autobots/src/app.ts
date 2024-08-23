import express from 'express';
import { createDatabaseConnection } from './config/database.config';
import { startBackgroundProcess } from './utils/autobotbackground.utils';
import autobotRoutes from './routes/autobot.route';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

createDatabaseConnection()
  .then(() => {
    console.log('Database connected successfully');

    app.use(express.json());
    app.use('/api', autobotRoutes);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      // startBackgroundProcess();
    });
  })
  .catch(error => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });