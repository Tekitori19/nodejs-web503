import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/medium_clone',
    JWT_SECRET: process.env.JWT_SECRET || 'test',
    JWT_EXPIRE: '24h'
};
