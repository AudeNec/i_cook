import type { RequestHandler } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const browse: RequestHandler = async (_req, res) => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    res.status(200).json(ingredients);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching ingredients." });
  }
};

const add: RequestHandler = async (req, res) => {
  const { name, unit } = req.body;
  if (!name || !unit) {
    res.status(400).json({ error: "Name and unit are required." });
    return;
  }

  try {
    const newIngredient = await prisma.ingredient.create({
      data: {
        name,
        unit,
      },
    });
    res.status(201).json(newIngredient);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while adding the ingredient." });
  }
};

export default { browse, add };
