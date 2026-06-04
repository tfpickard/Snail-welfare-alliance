/**
 * Drizzle DB client over Neon's serverless HTTP driver.
 *
 * Build-safe: when DATABASE_URL is unset (e.g. the marketing-only deployment
 * with the Terrarium flag off), we fall back to a well-formed placeholder
 * connection string. `neon()` parses it without connecting, so importing this
 * module — and constructing the Auth.js Drizzle adapter — never throws at build
 * time. Any actual query without a real DATABASE_URL will fail at runtime, which
 * can only happen behind the auth + Terrarium feature flag.
 */
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const PLACEHOLDER_URL =
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";

/** True only when a real database is configured. */
export const dbConfigured = Boolean(process.env.DATABASE_URL);

const url = process.env.DATABASE_URL ?? PLACEHOLDER_URL;

export const db: NeonHttpDatabase<typeof schema> = drizzle(neon(url), { schema });

export { schema };
