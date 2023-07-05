import { Router } from "express";

import { userController } from "../controllers";
import { commonMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.get("/", userController.findAll);
router.post("/", userMiddleware.isCreateValid, userController.create);
router.get("/:id", commonMiddleware.isIdValid, userController.findById);
router.put("/:id", commonMiddleware.isIdValid, userController.update);
router.delete("/:id", commonMiddleware.isIdValid, userController.delete);

export const userRouter = router;
