import { Router } from "express";
const router = Router();

router.get("/:token", (req, res) => {
  return res.send(req.params.token);
});

router.post("/login", (req, res) => {
  return res.status(201).send();
});

router.delete("/logout", (req, res) => {
  return res.status(204).send();
});

export default router;
