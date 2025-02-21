import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    bio: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

export const ProfileModel = mongoose.model('Profile', ProfileSchema)
