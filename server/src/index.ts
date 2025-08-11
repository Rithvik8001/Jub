import express, { Express } from "express";
import dotenv from "dotenv";
import { sql } from "drizzle-orm";
dotenv.config();
import db from "./config/index.ts";

const app: Express = express();
app.use(express.json());

async function main() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("✅ Database connection established successfully");

    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

main();
