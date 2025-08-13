import { Request, Response } from "express";
import db from "../../config/index";
import { urls } from "../../models/schema";
import { eq, and } from "drizzle-orm";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const getUrlById = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const { urlId } = req.params;

    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!urlId) {
      return res.status(400).json({ message: "URL ID is required" });
    }

    const url = await db
      .select()
      .from(urls)
      .where(and(eq(urls.id, urlId), eq(urls.userId, id)))
      .limit(1);

    if (url.length === 0) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.status(200).json({
      message: "URL fetched successfully",
      data: url[0],
    });
  } catch (error) {
    console.error("Error fetching URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getUrlById;
