import { Request, Response } from "express";
import db from "../../config/index";
import user from "../../models/user.model";
import { signupValidation } from "../../validations/auth/signupValidation";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = signupValidation.parse(req.body);
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertResult = await db
      .insert(user)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    const newUser = insertResult[0];

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    return res
      .status(201)
      .json({ message: "User created successfully", userData });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export default signup;
