import { Router } from "express";
import sessionController from "../controllers/session";

const router = Router();

router.get("/:token", (req, res) => {
  return res.send(req.params.token);
});

router.post("/login", (req, res) => {
  const token = sessionController.getToken(req.body.email, req.body.password);
  return res.status(401).json(token);
});

router.delete("/logout", (req, res) => {
  return res.status(204).send();
});

export default router;
