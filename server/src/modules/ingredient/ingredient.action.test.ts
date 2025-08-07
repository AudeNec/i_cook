import ingredientActions from "./ingredient.actions";
import { IngredientRepository } from "./ingredient.repository";

import type { Request, Response } from "express";

// Mock Response object
const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const next = jest.fn();

describe("ingredient.controller", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("browse", () => {
    it("should return ingredients with 200", async () => {
      const mockIngredients = [{ id: 1, name: "Tomato", unit: "pièce" }];
      jest
        .spyOn(IngredientRepository, "readAll")
        .mockResolvedValue(mockIngredients);

      const req = {} as Request;
      const res = mockResponse();

      await ingredientActions.browse(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockIngredients);
    });

    it("should return 404 when no ingredients", async () => {
      jest.spyOn(IngredientRepository, "readAll").mockResolvedValue([]);

      const req = {} as Request;
      const res = mockResponse();

      await ingredientActions.browse(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "No ingredients found." });
    });

    it("should return 500 on repository error", async () => {
      jest
        .spyOn(IngredientRepository, "readAll")
        .mockRejectedValue(new Error("DB error"));

      const req = {} as Request;
      const res = mockResponse();

      await ingredientActions.browse(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "An error occurred while fetching ingredients.",
      });
    });
  });

  describe("add", () => {
    it("should add ingredient and return 201", async () => {
      const req = {
        body: { name: "Onion", unit: "g" },
      } as Request;
      const res = mockResponse();

      const mockNewIngredient = { id: 2, name: "Onion", unit: "g" };
      jest
        .spyOn(IngredientRepository, "create")
        .mockResolvedValue(mockNewIngredient);

      await ingredientActions.add(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewIngredient);
    });

    it("should return 400 when name or unit is missing", async () => {
      const req = {
        body: { name: "" }, // unit manquant
      } as Request;
      const res = mockResponse();

      await ingredientActions.add(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Name and unit are required.",
      });
    });

    it("should return 500 on repository error", async () => {
      const req = {
        body: { name: "Salt", unit: "g" },
      } as Request;
      const res = mockResponse();

      jest
        .spyOn(IngredientRepository, "create")
        .mockRejectedValue(new Error("DB error"));

      await ingredientActions.add(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "An error occurred while adding the ingredient.",
      });
    });
  });
});
