import express from 'express';
import connectDB from '../config/db';
import postRoutes from './routes/post.route';

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Kết nối DB
connectDB();

// Routes
app.use('/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
