import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const uri = process.env.MONGO || '';
        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
