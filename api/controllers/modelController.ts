import type { Request, Response } from "express";
import {
  getModelsByBrandId,
  createModel,
  updateModelPrice,
  getModels as getModelsService,
} from "../services/modelService";
import {
  postModelSchema,
  putModelSchema,
  getModelsSchema,
} from "../schemas/modelSchemas";

export const getModels = async (req: Request, res: Response) => {
  const { success, data, error } = getModelsSchema.safeParse(req.query);

  if (!success) {
    return res.status(400).json({ error });
  }

  try {
    const models = await getModelsService(data.greater, data.lower);
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getModelsByBrand = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const models = await getModelsByBrandId(Number.parseInt(id));
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const postModel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { success, data, error } = postModelSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error });
  }

  try {
    const model = await createModel(
      Number.parseInt(id),
      data.name,
      data.average_price
    );
    res.json(model);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateModel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { success, data, error } = putModelSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ error });
  }

  try {
    const model = await updateModelPrice(
      Number.parseInt(id),
      data.average_price
    );
    res.json(model);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
