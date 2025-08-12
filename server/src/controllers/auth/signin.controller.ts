import { Request, Response } from "express";
import { signInValidation } from "../../validations/auth/signInValidation";
import db from "../../config/index";
import { user } from "../../models/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

const JWT_SECRET = process.env.JWT_SECRET as string;

const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = signInValidation.parse(req.body);

    const isUserExist = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    if (isUserExist.length === 0) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const currentUser = isUserExist[0];
    if (!currentUser) {
      return res.status(500).json({ message: "User data not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      currentUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: currentUser.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000),
    });

    const userData = {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
    };

    return res.status(200).json({
      message: "Signin successful",
      userData,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: "Invalid input: Please provide valid email and password",
      });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default signin;
