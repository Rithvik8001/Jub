import { Request, Response } from "express";
import db from "../../config/index";
import { urls } from "../../models/schema";
import { desc, eq, and, like, sql } from "drizzle-orm";
import { querySchema } from "../../validations";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

type Url = {
  id: string | null;
  destinationUrl: string;
  shortUrl: string;
  userId: string | null;
  comments?: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

const getUrls = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const queryResult = querySchema.safeParse(req.query);
    if (!queryResult.success) {
      return res.status(400).json({
        message: "Invalid query parameters",
        errors: queryResult.error.issues,
      });
    }

    const { page = 1, limit = 10, search } = queryResult.data;
    const offset = (page - 1) * limit;

    let whereClause = eq(urls.userId, id);
    if (search) {
      whereClause = and(
        eq(urls.userId, id),
        like(urls.destinationUrl, `%${search}%`)
      )!;
    }

    const allUrls: Url[] = await db
      .select()
      .from(urls)
      .where(whereClause)
      .orderBy(desc(urls.createdAt))
      .limit(limit)
      .offset(offset);

    const totalCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(urls)
      .where(whereClause);

    const total = totalCount[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      message: "Urls fetched successfully",
      data: allUrls,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getUrls;
