import { Request, Response } from "express";
import db from "../../config/index";
import { user } from "../../models/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { updateProfileSchema } from "../../validations";

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req;
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate request body
    const validationResult = updateProfileSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Invalid input data",
        errors: validationResult.error.issues,
      });
    }

    const { name, password } = validationResult.data;

    // Check if user exists
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1);

    if (existingUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare update data
    const updateData: { name?: string; password?: string; updatedAt: Date } = {
      updatedAt: new Date(),
    };

    // Add name if provided
    if (name) {
      updateData.name = name;
    }

    // Add hashed password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Update user profile
    const updatedUser = await db
      .update(user)
      .set(updateData)
      .where(eq(user.id, id))
      .returning({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

    if (updatedUser.length === 0) {
      return res.status(500).json({ message: "Failed to update profile" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser[0],
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default updateProfile;
