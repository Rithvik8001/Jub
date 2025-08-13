import { Request, Response } from "express";
import db from "../../config/index";
import { urls } from "../../models/schema";
import { eq, and } from "drizzle-orm";
import { updateUrlSchema } from "../../validations";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const updateUrl = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    const { urlId } = req.params;

    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!urlId) {
      return res.status(400).json({ message: "URL ID is required" });
    }

    const validationResult = updateUrlSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid input data",
        errors: validationResult.error.issues,
      });
    }

    const existingUrl = await db
      .select()
      .from(urls)
      .where(and(eq(urls.id, urlId), eq(urls.userId, id)))
      .limit(1);

    if (existingUrl.length === 0) {
      return res.status(404).json({ message: "URL not found" });
    }

    const updatedUrl = await db
      .update(urls)
      .set({
        ...validationResult.data,
        updatedAt: new Date(),
      })
      .where(and(eq(urls.id, urlId), eq(urls.userId, id)))
      .returning();

    return res.status(200).json({
      message: "URL updated successfully",
      data: updatedUrl[0],
    });
  } catch (error) {
    console.error("Error updating URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default updateUrl;
