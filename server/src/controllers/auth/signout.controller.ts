import { Request, Response } from "express";

const signout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });
    return res.status(200).json({ message: "Signout successful" });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export default signout;
