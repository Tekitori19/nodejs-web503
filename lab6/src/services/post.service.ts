import { PostModel } from "../models/posts.model.js";

class PostService {
    getAll() {
        return PostModel.find()
    }

    getById(id: string) {
        return PostModel.findById(id)
    }

    create(title: string, imgPath: string, desc: string) {
        const newPost = new PostModel({
            title,
            imgPath,
            desc
        })
        return newPost.save()
    }

    deleteById(id: string) {
        return PostModel.findByIdAndDelete({ _id: id })
    }
}

export default new PostService();
