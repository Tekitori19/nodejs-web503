import express from "express"
import { PostModel } from "../models/posts.model.js"
import { UserRequest } from "../types/userRequest.js"

class PostController {
    async getAllPost(_req: express.Request, res: express.Response) {
        PostModel.find().then(documents => {
            if (documents) {
                res.status(200).json({
                    message: "Posts fetched successfully!",
                    posts: documents
                });
            }
            else {
                res.status(404).json({ message: "Post not found!" });
            }
        });
    }

    async getPost(req: express.Request, res: express.Response) {
        PostModel.findById(req.params.id).then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "Post not found!" });
            }
        });
    }

    async createPost(req: UserRequest, res: express.Response) {
        const url = req.protocol + "://" + req.get("host")
        const post = new PostModel({
            title: req.body.title,
            content: req.body.content,
            imagePath: url + "/images/" + req.file?.filename,
            creator: req.userData?.userId,
            postDate: req.body.postDate,
        })
        post.save().
            then(post => {
                if (post) {
                    res.status(201).json({
                        message: "Post added successfully",
                        post: {
                            ...post,
                            id: post._id
                        }
                    })
                }
                else {
                    res.status(500).json({ message: "Error Adding Post" });
                }

            })
            .catch(_e => { })
    }

    async updatePost(req: UserRequest, res: express.Response) {
        let imagePath = req.body.imagePath;
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename
        }

        const post = new PostModel({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            imagePath: imagePath,
            creator: req.userData?.userId
        });
        PostModel.updateOne(
            { _id: req.params.id, creator: req.userData?.userId },
            post
        ).then(result => {
            if (result) {
                res.status(200).json({ message: "Update successful!" });
            }

            else {
                res.status(500).json({ message: "Error Upating Post" });
            }
        });
    }

    async getMyPosts(req: UserRequest, res: express.Response) {
        PostModel.find({ creator: req.userData?.userId }).then(post => {
            if (post) {
                res.status(200).json({
                    message: "Posts fetched successfully!",
                    posts: post
                });
            } else {
                res.status(404).json({ message: "Post not found!" });
            }
        })
            .catch(_e => { });
    }

    async deletePost(req: UserRequest, res: express.Response) {
        PostModel.deleteOne({ _id: req.params.id, creator: req.userData?.userId }).then(
            result => {
                if (result.deletedCount > 0) {
                    res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.status(401).json({ message: "Not authorized!!" });
                }
            }
        );
    }
}

export default new PostController();
