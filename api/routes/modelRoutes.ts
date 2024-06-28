import { Router } from "express";
import { getModels, updateModel } from "../controllers/modelController";

const router = Router();

// PUT /models/:id
router.put("/:id", updateModel);
// GET /models
router.get("/", getModels);

export default router;
