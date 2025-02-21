import express from "express"
import PostService from "../services/post.service.js"

class PostController {
    async getAllPost(req: express.Request, res: express.Response) {
        try {
            const posts = await PostService.getAll()
            res.render('posts/posts', { data: posts })
            // return res.status(200).json({ data: posts })
        } catch (error: Error | any) {
            return res.status(400).json({ message: error.message })
        }
    }

    async getPost(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            const post = await PostService.getById(id)
            res.render('posts/post', { data: post })
            // return res.status(200).json({ data: post })
        } catch (error: Error | any) {
            return res.status(400).json({ message: error.message })
        }
    }

    async createPost(req: express.Request, res: express.Response) {
        try {
            const { title, imgPath, desc } = req.body
            console.log(title, imgPath, desc)

            const newPost = await PostService.create(title, imgPath, desc)
            return res.status(200).json({ message: "Post created successfully", data: newPost })
        } catch (error: Error | any) {
            return res.status(400).json({ message: error.message })
        }
    }

    async updatePostView(req: express.Request, res: express.Response) {
        const post = await PostService.getById(req.params.id)
        console.log(post);

        res.render('posts/edit', {
            data: post
        })
    }

    async updatePost(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            const post = await PostService.getById(id)

            const { title, imgPath, desc } = req.body
            if (post) {
                post.title = title
                post.imgPath = imgPath
                post.desc = desc
                await post.save()
                return res.status(200).json({ message: "Post updated successfully", data: post })
            }
            res.status(404).json({ message: "Post not found" })
        } catch (error: Error | any) {
            return res.status(400).json({ message: error.message })
        }
    }

    async deletePost(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            await PostService.deleteById(id)
            return res.status(200).json({ message: "Post deleted successfully" })
        } catch (error: Error | any) {
            return res.status(400).json({ message: error.message })
        }
    }
}

export default new PostController();
