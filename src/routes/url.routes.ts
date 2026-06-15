import { Router } from "express";
import { createUrl, redirectToOriginalUrl } from "../controllers/url.controller.js";

const router = Router();

router.post("/create", createUrl);

router.get("/:shortCode", redirectToOriginalUrl);

export default router;