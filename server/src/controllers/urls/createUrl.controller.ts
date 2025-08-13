import { Request, Response } from "express";
import db from "../../config/index";
import { urls } from "../../models/schema";
import { eq } from "drizzle-orm";
import { createUrlSchema } from "../../validations";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const createUrl = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const validationResult = createUrlSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid input data",
        errors: validationResult.error.issues,
      });
    }

    const { destinationUrl, shortUrl, comments } = validationResult.data;

    const existingUrl = await db
      .select()
      .from(urls)
      .where(eq(urls.shortUrl, shortUrl))
      .limit(1);

    if (existingUrl.length > 0) {
      return res.status(409).json({ message: "Short URL already exists" });
    }

    const newUrl = await db
      .insert(urls)
      .values({
        destinationUrl,
        shortUrl,
        comments,
        userId: id,
      })
      .returning();

    return res.status(201).json({
      message: "URL created successfully",
      data: newUrl[0],
    });
  } catch (error) {
    console.error("Error creating URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default createUrl;
