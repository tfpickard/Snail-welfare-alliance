/**
 * Seed a little life into the Terrarium for local development.
 * Run with: DATABASE_URL=... npm run db:seed
 *
 * Creates a couple of demo keepers, each with a snail (one carrying the rare
 * Tyrian-purple morph), plus a few diary entries — so the garden, discovery,
 * and leaderboards have something to show.
 */
import { db } from "./index";
import { users, terrariums, snails, diaryEvents } from "./schema";
import { randomGenome, type Genome } from "../lib/terrarium/genetics";
import { randomSeed } from "../lib/terrarium/rng";
import { diaryMessage } from "../lib/terrarium/events";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to seed. Aborting.");
  }

  const keepers = [
    { displayName: "fernkeeper", email: "fern@example.com" },
    { displayName: "dewdrop", email: "dew@example.com" },
  ];

  for (const [i, k] of keepers.entries()) {
    const [user] = await db
      .insert(users)
      .values({ name: k.displayName, displayName: k.displayName, email: k.email })
      .returning();
    await db.insert(terrariums).values({ ownerId: user.id });

    // The second keeper's snail is a deep-Tyrian morph for demonstration.
    const genome: Genome =
      i === 1
        ? { ...randomGenome(randomSeed()), hue: 0.97 }
        : randomGenome(randomSeed());

    const [snail] = await db
      .insert(snails)
      .values({
        ownerId: user.id,
        name: i === 1 ? "Wisteria" : "Muretta",
        genome,
        generation: 1,
      })
      .returning();

    await db.insert(diaryEvents).values([
      { snailId: snail.id, kind: "hatched", message: diaryMessage("hatched") },
      { snailId: snail.id, kind: "explored", message: diaryMessage("explored") },
    ]);
  }

  console.log("Seeded demo keepers and snails.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
