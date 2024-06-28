import { expect, test, vi, describe } from "vitest";
import {
  createModel,
  getModels,
  getModelsByBrandId,
  updateModelPrice,
} from "../services/modelService";
import prisma from "../../libs/__mocks__/prisma";

vi.mock("../../libs/prisma");

describe("Model Service", () => {
  test("createModel should return the generated model", async () => {
    const model = { name: "Test", brandId: 1, average_price: 10_000_000 };
    prisma.brand.findFirst.mockResolvedValue({ id: 1, name: "Test" });

    prisma.model.create.mockResolvedValue({ ...model, id: 1 });

    const newModel = await createModel(
      model.brandId,
      model.name,
      model.average_price
    );
    expect(newModel).toEqual({
      ...model,
      id: 1,
    });
  });

  // Get an error because brandId is not found
  test("createModel should return an error if brandId is not found", async () => {
    const model = { name: "Test", brandId: 1, average_price: 10_000_000 };
    prisma.brand.findFirst.mockResolvedValue(null);

    try {
      await createModel(model.brandId, model.name, model.average_price);
    } catch (error) {
      expect(error.message).toBe("Brand not found.");
    }
  });

  // Get an error because model already exists
  test("createModel should return an error if model already exists", async () => {
    const model = { name: "Test", brandId: 1, average_price: 10_000_000 };
    prisma.brand.findFirst.mockResolvedValue({ id: 1, name: "Test" });
    prisma.model.findFirst.mockResolvedValue({ ...model, id: 1 });

    try {
      await createModel(model.brandId, model.name, model.average_price);
    } catch (error) {
      expect(error.message).toBe("Model already exists for that brand.");
    }
  });

  // Get an error because average_price is less than 100,000

  test("createModel should return an error if average_price is less than 100,000", async () => {
    const model = { name: "Test", brandId: 1, average_price: 10_000 };
    prisma.brand.findFirst.mockResolvedValue({ id: 1, name: "Test" });
    prisma.model.findFirst.mockResolvedValue(null);

    try {
      await createModel(model.brandId, model.name, model.average_price);
    } catch (error) {
      expect(error.message).toBe("Average price must be greater than 100,000.");
    }
  });

  test("updateModelPrice should return the updated model", async () => {
    const model = {
      id: 1,
      name: "Test",
      brandId: 1,
      average_price: 10_000_000,
    };
    prisma.model.update.mockResolvedValue({
      ...model,
      average_price: 20_000_000,
    });

    const updatedModel = await updateModelPrice(model.id, 20_000_000);
    expect(updatedModel).toEqual({
      ...model,
      average_price: 20_000_000,
    });
  });

  // Get All Models

  test("getModels should return all models", async () => {
    const models = [
      { id: 1, name: "Test1", brandId: 1, average_price: 1000 },
      { id: 2, name: "Test2", brandId: 1, average_price: 2000 },
    ];
    prisma.model.findMany.mockResolvedValue(models);

    const result = await getModels();
    expect(result).toEqual(models);
  });

  test("getModelsByBrandId should return all models by brandId", async () => {
    const models = [
      { id: 1, name: "Test1", brandId: 1, average_price: 1000 },
      { id: 2, name: "Test2", brandId: 1, average_price: 2000 },
    ];
    prisma.model.findMany.mockResolvedValue(models);

    const result = await getModelsByBrandId(1);
    expect(result).toEqual(models);
  });
});
