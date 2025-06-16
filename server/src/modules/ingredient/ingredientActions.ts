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

export default { browse };
