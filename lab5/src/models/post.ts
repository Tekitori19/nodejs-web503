// import { Schema, model, Document } from 'mongoose';
//
// export interface IPost extends Document {
//     title: string;
//     content: string;
//     createdAt: Date;
// }
//
// const postSchema = new Schema<IPost>({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// });
//
// // Phương thức tạo mới bài post
// postSchema.statics.createPost = async function (title: string, content: string) {
//     return this.create({ title, content });
// };
//
// // Phương thức đọc bài post theo ID
// postSchema.statics.getPostById = async function (id: string) {
//     return this.findById(id);
// };
//
// // Phương thức cập nhật bài post
// postSchema.statics.updatePost = async function (id: string, data: Partial<IPost>) {
//     return this.findByIdAndUpdate(id, data, { new: true });
// };
//
// // Phương thức xóa bài post
// postSchema.statics.deletePost = async function (id: string) {
//     return this.findByIdAndDelete(id);
// };
//
// export const Post = model<IPost>('Post', postSchema);


import { Schema, model, Document, Model } from 'mongoose';

export interface IPost extends Document {
    title: string;
    content: string;
    createdAt: Date;
}

// Định nghĩa interface cho các phương thức tĩnh
interface IPostModel extends Model<IPost> {
    createPost(title: string, content: string): Promise<IPost>;
    getPostById(id: string): Promise<IPost | null>;
    updatePost(id: string, data: Partial<IPost>): Promise<IPost | null>;
    deletePost(id: string): Promise<IPost | null>;
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Thêm phương thức tĩnh vào schema
postSchema.statics.createPost = async function (title: string, content: string) {
    return this.create({ title, content });
};

postSchema.statics.getPostById = async function (id: string) {
    return this.findById(id);
};

postSchema.statics.updatePost = async function (id: string, data: Partial<IPost>) {
    return this.findByIdAndUpdate(id, data, { new: true });
};

postSchema.statics.deletePost = async function (id: string) {
    return this.findByIdAndDelete(id);
};

// Export model với kiểu IPostModel
export const Post = model<IPost, IPostModel>('Post', postSchema);
