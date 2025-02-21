import { Request, Response } from "express"
import { ProfileModel } from "../models/profile.model.js"
import { UserRequest } from "../types/userRequest.js"
import { PostModel } from "../models/posts.model.js";

class ProfileController {
    async getAllProfile(req: Request, res: Response) {
        ProfileModel.find().then(prof => {
            if (prof) {

                res.status(200).json({
                    message: "Profile fetched successfully!",
                    profile: prof
                });
            } else {
                res.status(404).json({ message: "Profile not found!" });
            }
        })
            .catch(e => {
                console.log(e)
            });
    }

    async getProfile(req: UserRequest, res: Response) {
        ProfileModel.findOne({ creator: req.userData?.userId }).then(prof => {
            if (prof) {

                res.status(200).json({
                    message: "Profile fetched successfully!",
                    profile: prof
                });
            } else {
                res.status(404).json({ message: "Profile not found!" });
            }
        });
    }

    async createProfile(req: UserRequest, res: Response) {
        const url = req.protocol + "://" + req.get("host")
        const profile = new ProfileModel({
            username: req.body.username,
            bio: req.body.bio,
            imagePath: url + "/images/" + req.file?.filename,
            creator: req.userData?.userId
        })

        try {
            const user1 = await ProfileModel.findOne({ creator: req.userData?.userId });
            if (user1) {
                return res.status(401).json({
                    message: "Profile Already Exist"
                });
            }

            const prof = await profile.save();
            if (!prof) {
                return res.status(500).json({
                    message: "Error Creating Profile"
                });
            }

            res.status(201).json({
                message: "Profile created!",
                profile: prof
            });
        } catch (e) {
            console.log("error is", e);
            res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }

    async updateProfile(req: UserRequest, res: Response) {
        let imagePath = req.body.imagePath;
        const url = req.protocol + "://" + req.get("host")
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            imagePath = url + "/images/" + req.file.filename
        }

        const profile = new ProfileModel({
            _id: req.body.id,
            username: req.body.username,
            bio: req.body.bio,
            imagePath: imagePath,
            creator: req.userData?.userId
        })

        ProfileModel.updateOne(
            { _id: req.params.id, creator: req.userData?.userId },
            profile
        ).then(result => {
            if (result) {
                res.status(200).json({ message: "Update successful!" });
            }

            else {
                res.status(500).json({ message: "Error Upating Profile" });
            }
        })
            .catch(e => {
                res.status(500).json({ message: "Error Upating Profile ,Username taken" });
                console.log(e)
            });
    }

    async byCreator(req: Request, res: Response) {
        ProfileModel.find({ creator: req.params.id }).then(prof => {
            if (prof) {
                res.status(200).json({
                    message: "Profile fetched successfully!",
                    profile: prof
                });
            } else {
                res.status(404).json({ message: "Profile not found!" });
            }
        });
    }

    async viewProfile(req: UserRequest, res: Response) {
        ProfileModel.findOne({ creator: req.userData?.userId }).then(prof => {
            if (prof) {

                res.status(200).json({
                    message: "Profile fetched successfully!",
                    profile: prof
                });
            } else {
                res.status(404).json({ message: "Profile not found!" });
            }
        });
    }

    async getMyPost(req: Request, res: Response) {
        let user
        let creatorId
        ProfileModel.findOne({ username: req.params.id }).then(prof => {
            if (prof) {
                user = prof
                return PostModel.find({ creator: user.creator })
            }
        }).then(post => {

            res.status(200).json({
                message: "Post fetched successfully!",
                post: post
            });
        })
            .catch(e => {
                console.log(e)
                res.status(404).json({ message: "error Fetching Post!" });
            });
    }
}

export default new ProfileController();
