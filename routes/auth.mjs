import { Router } from "express";
import * as authControllers from "../controllers/auth.mjs";

const router = Router();

router.get("/verify", authControllers.verify);
router.post("/register", authControllers.register);
router.post("/login", authControllers.login);

export default router;
