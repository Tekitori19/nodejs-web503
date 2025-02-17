import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imgPath: {
        type: String
    },
    desc: {
        type: String,
        required: true
    },
})

export const PostModel = mongoose.model('Post', PostSchema)
