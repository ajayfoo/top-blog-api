import { PrismaClient } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const db = new PrismaClient();
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLIC_KEY
);

export { db, supabase };
