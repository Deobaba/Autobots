import dotenv from 'dotenv';

dotenv.config();

export default () => ({

    database:{
        type: 'mysql',
        host: process.env.DB_HOST || '',
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
      
    }
})