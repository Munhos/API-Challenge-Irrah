import { Router, Request, Response } from "express";
import { AuthController } from "../../controllers/AuthController/AuthController";

export const router = Router();
const authController = new AuthController();

router.post("/auth", (req: Request, res: Response) => {
  authController.autorize(req, res);
});

export default router;
