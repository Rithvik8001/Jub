import { Request, Response } from "express";
import db from "../../config/index";
import { user } from "../../models/schema";
import { eq } from "drizzle-orm";

type User = {
  id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const id = req.id as string;
    if (!id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const findUser = await db.select().from(user).where(eq(user.id, id));
    if (!findUser || findUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData: User = {
      id: findUser[0]?.id,
      name: findUser[0]?.name,
      email: findUser[0]?.email,
    };
    return res
      .status(200)
      .json({ message: "Profile fetched successfully", userData });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export default getProfile;
