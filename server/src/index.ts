import express, { Express } from "express";
import dotenv from "dotenv";
import { sql } from "drizzle-orm";
dotenv.config();
import db from "./config/index.ts";
import cors from "cors";
import authRouter from "./routes/auth/auth.router.ts";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/profile/profile.router.ts";
import urlRouter from "./routes/urls/url.router.ts";

const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(`/api/auth`, authRouter);
app.use(`/api/profile`, profileRouter);
app.use(`/api/urls`, urlRouter);

async function main() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("✅ Database connection established successfully");

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

main();
