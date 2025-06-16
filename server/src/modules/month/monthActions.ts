import type { RequestHandler } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const browse: RequestHandler = async (_req, res) => {
  try {
    const months = await prisma.month.findMany();
    res.status(200).json(months);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching ingredients." });
  }
};

export default { browse };
