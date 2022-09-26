import { Router } from "express";
import userController from "../controllers/user";

const router = Router();

router.get("/", (req, res) => {
  return res.send();
});

router.post("/signup", async (req, res) => {
  const user = await userController.createUser(
    req.body.email,
    req.body.password
  );
  return res.status(201).json(user);
});

export default router;
