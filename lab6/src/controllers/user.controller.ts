import express from "express"
import UserService from "../services/user.service.js"

class UserController {
    async getAllUser(req: express.Request, res: express.Response) {
        try {
            const users = await UserService.getAll()
            res.status(200).json({ data: users })
        } catch (error: Error | any) {
            return res.status(400).json({ message: error.message })
        }
    }

    async getUser(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            const user = await UserService.getById(id)
            res.status(200).json({ data: user })
        } catch (error: Error | any) {
            return res.status(400).json({ message: error.message })
        }
    }

    async createUser(req: express.Request, res: express.Response) {
        try {
            const { name, email, password } = req.body
            const newUser = await UserService.create(name, email, password)
            return res.status(200).json({ message: "User created successfully", data: newUser })
        } catch (error: Error | any) {
            return res.status(400).json({ message: error.message })
        }
    }

    async updateUser(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            const user = await UserService.getById(id)

            const { name, email, password } = req.body
            if (user) {
                user.name = name
                user.email = email
                user.password = password
                await user.save()
                return res.status(200).json({ message: "User updated successfully", data: user })
            }
            res.status(404).json({ message: "User not found" })
        } catch (error: Error | any) {
            return res.status(400).json({ message: error.message })
        }
    }

    async deleteUser(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            await UserService.deleteById(id)
            return res.status(200).json({ message: "User deleted successfully" })
        } catch (error: Error | any) {
            return res.status(400).json({ message: error.message })
        }
    }
}

export default new UserController();
