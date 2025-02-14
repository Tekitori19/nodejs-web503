import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Hash password trước khi lưu
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Phương thức so sánh password
userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

// Phương thức tạo user
userSchema.statics.createUser = async function (username: string, email: string, password: string) {
    return this.create({ username, email, password });
};

export const User = model<IUser>('User', userSchema);
