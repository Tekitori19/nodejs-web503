import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },

    postDate: {
        type: String,
        required: true
    },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

export const PostModel = mongoose.model('Post', PostSchema)
