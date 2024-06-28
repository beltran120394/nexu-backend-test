import prisma from "../../libs/prisma";

export const getAllBrands = async () => {
  const brands = await prisma.brand.findMany({
    orderBy: { name: "asc" },
    include: { models: true },
  });

  return brands.map((brand) => {
    const average_price =
      brand.models.reduce((acc, model) => acc + model.average_price, 0) /
      brand.models.length;

    return {
      id: brand.id,
      name: brand.name,
      average_price: Math.trunc(average_price),
    };
  });
};

export const createBrand = async (name: string) => {
  const existingBrand = await prisma.brand.findFirst({ where: { name } });

  if (existingBrand) {
    throw new Error("Brand already exists.");
  }

  const brand = await prisma.brand.create({ data: { name } });
  return brand;
};

export const getModelsByBrandId = async (id: number) => {
  const models = await prisma.model.findMany({
    where: { brandId: id },
    orderBy: { name: "asc" },
    select: { id: true, name: true, average_price: true },
  });

  return models;
};
