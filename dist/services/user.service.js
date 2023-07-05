"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("../models/user.model");
class UserService {
    async findAll() {
        return await user_model_1.User.find().select("-password");
    }
    async create(data) {
        return await user_model_1.User.create(data);
    }
    async findById(id) {
        return await user_model_1.User.findById(id);
    }
    async update(id, data) {
        return await user_model_1.User.findOneAndUpdate({ _id: id }, { ...data }, { returnDocument: "after" });
    }
    async delete(id) {
        return await user_model_1.User.deleteOne({ _id: id });
    }
}
exports.userService = new UserService();
