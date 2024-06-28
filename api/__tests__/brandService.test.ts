import { expect, test, vi, describe } from "vitest";
import { createBrand, getAllBrands } from "../services/brandService";
import prisma from "../../libs/__mocks__/prisma";

vi.mock("../../libs/prisma");

describe("Brand Service", () => {
  // Get all brands
  test("getAllBrands should return all brands", async () => {
    const brands = [
      { id: 1, name: "Test1", models: [{ average_price: 1000 }] },
      { id: 2, name: "Test2", models: [{ average_price: 2000 }] },
    ];
    prisma.brand.findMany.mockResolvedValue(brands);

    const result = await getAllBrands();
    expect(result).toEqual([
      { id: 1, name: "Test1", average_price: 1000 },
      { id: 2, name: "Test2", average_price: 2000 },
    ]);
  });

  // List all models of the brand
  test("getAllBrands should return the average price of all models", async () => {
    const brands = [
      {
        id: 1,
        name: "Test1",
        models: [
          { average_price: 1000 },
          { average_price: 2000 },
          { average_price: 3000 },
        ],
      },
    ];
    prisma.brand.findMany.mockResolvedValue(brands);

    const result = await getAllBrands();
    expect(result).toEqual([{ id: 1, name: "Test1", average_price: 2000 }]);
  });

  // Create a new brand
  test("createUser should return the generated user", async () => {
    const brand = { name: "Test" };
    prisma.brand.create.mockResolvedValue({ ...brand, id: 1 });

    const newBrand = await createBrand(brand.name);
    expect(newBrand).toEqual({
      ...brand,
      id: 1,
    });
  });

  // Get an error because name is repeated
  test("createUser should return an error if name is repeated", async () => {
    const brand = { name: "Test" };
    prisma.brand.findFirst.mockResolvedValue({ ...brand, id: 1 });

    try {
      await createBrand(brand.name);
    } catch (error) {
      expect(error.message).toBe("Brand already exists.");
    }
  });
});
