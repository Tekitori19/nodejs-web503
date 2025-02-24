import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    avatar: { type: String, default: 'https://via.placeholder.com/150' },
    description: { type: String, default: 'Chưa có mô tả' }
});
export default mongoose.model('User', userSchema);
