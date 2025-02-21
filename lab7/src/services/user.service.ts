import { UserModel } from "../models/user.model.js"

export default class UserService {
    static getAll() {
        return UserModel.find()
    }

    static getById(id: string) {
        return UserModel.findById(id)
    }

    static create(name: string, email: string, password: string) {
        const newUser = new UserModel({
            name,
            email,
            password
        })
        return newUser.save()
    }

    static deleteById(id: string) {
        return UserModel.findByIdAndDelete({ _id: id })
    }
}
