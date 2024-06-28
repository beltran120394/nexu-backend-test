import prisma from "../../libs/prisma";

export const getModelsByBrandId = async (brandId: number) => {
  return await prisma.model.findMany({
    where: { brandId },
    orderBy: { name: "asc" },
  });
};

export const createModel = async (
  brandId: number,
  name: string,
  average_price?: number
) => {
  const brand = await prisma.brand.findFirst({ where: { id: brandId } });

  if (!brand) {
    throw new Error("Brand not found.");
  }

  const existingModel = await prisma.model.findFirst({
    where: { name, brandId },
  });

  if (existingModel) {
    throw new Error("Model already exists for that brand.");
  }

  if (average_price && average_price < 100_000) {
    throw new Error("Average price must be greater than 100,000.");
  }

  const model = await prisma.model.create({
    data: { name, average_price: average_price || 0, brandId },
  });

  return model;
};

export const updateModelPrice = async (
  modelId: number,
  average_price: number
) => {
  if (average_price < 100_000) {
    throw new Error("Average price must be greater than 100,000.");
  }

  const model = await prisma.model.update({
    where: { id: modelId },
    data: { average_price },
  });

  return model;
};

export const getModels = async (greater?: number, lower?: number) => {
  return await prisma.model.findMany({
    where: {
      average_price: {
        gte: greater || 0,
        lte: lower || 1_000_000_000,
      },
    },
    orderBy: { average_price: "asc" },
  });
};
