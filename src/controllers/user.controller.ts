import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators";

class UserController {
  public async findAll(
    req: Request,
    res: Response
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();
      return res.json(users);
    } catch (e) {
      console.log(e.message);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const createdUser = await userService.create(req.res.locals as IUser);
      return res.status(200).json(createdUser);
    } catch (e) {
      next(e);
    }
  }
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const user = await userService.findById(req.params.id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const updatedUser = await userService.update(id, value);
      return res.status(201).json(updatedUser);
    } catch (e) {
      next(e);
    }
  }
  public async delete(req: Request, res: Response): Promise<Response<void>> {
    const { id } = req.params;
    await userService.delete(id);
    return res.sendStatus(200);
  }
}

export const userController = new UserController();
