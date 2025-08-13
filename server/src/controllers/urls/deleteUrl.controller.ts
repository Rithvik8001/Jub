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

const deleteUrl = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const { urlId } = req.params;

    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!urlId) {
      return res.status(400).json({ message: "URL ID is required" });
    }

    const existingUrl = await db
      .select()
      .from(urls)
      .where(and(eq(urls.id, urlId), eq(urls.userId, id)))
      .limit(1);

    if (existingUrl.length === 0) {
      return res.status(404).json({ message: "URL not found" });
    }

    await db.delete(urls).where(and(eq(urls.id, urlId), eq(urls.userId, id)));

    return res.status(200).json({
      message: "URL deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteUrl;
