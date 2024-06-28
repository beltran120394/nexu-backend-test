import type { Request, Response } from "express";
import {
  getAllBrands,
  createBrand,
  getModelsByBrandId,
} from "../services/brandService";
import { postBrandSchema } from "../schemas/brandSchemas";

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await getAllBrands();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postBrand = async (req: Request, res: Response) => {
  const { success, data, error } = postBrandSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error });
  }

  try {
    const brand = await createBrand(data.name);
    res.json(brand);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const getAllModelsByBrandId = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const models = await getModelsByBrandId(Number.parseInt(id));
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
