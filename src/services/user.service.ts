import { User } from "../models/user.model";
import { IUser } from "../types/user.type";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return User.find().select("-password");
  }
  public async create(data: IUser) {
    return User.create(data);
  }
  public async findById(id: string): Promise<IUser> {
    return User.findById(id);
  }
  public async update(id: string, data: IUser): Promise<IUser> {
    return User.findOneAndUpdate(
      { _id: id },
      { ...data },
      { returnDocument: "after" }
    );
  }
  public async delete(id: string) {
    return User.deleteOne({ _id: id });
  }
}
export const userService = new UserService();
