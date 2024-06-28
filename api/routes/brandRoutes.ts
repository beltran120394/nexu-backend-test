import { Router } from "express";
import {
  getBrands,
  postBrand,
  getAllModelsByBrandId,
} from "../controllers/brandController";
import { postModel } from "../controllers/modelController";

const router = Router();
//GET /brands
router.get("/", getBrands);
//POST /brands
router.post("/", postBrand);
//GET /brands/:id/models
router.get("/:id/models", getAllModelsByBrandId);
// POST /brands/:id/models
router.post("/:id/models", postModel);

export default router;
