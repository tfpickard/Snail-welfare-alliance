import type { Metadata } from "next";
import { auth } from "@/auth";
import { assertTerrariumEnabled } from "@/lib/terrarium/guard";
import * as svc from "@/lib/terrarium/service";
import { TerrariumIntro } from "@/components/terrarium/TerrariumIntro";
import { Dashboard } from "@/components/terrarium/Dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Terrarium",
  description:
    "A calm, persistent snail-keeping game where you cannot harm a snail. Care, don't exploit.",
  robots: { index: false, follow: false },
};

export default async function TerrariumPage() {
  assertTerrariumEnabled();

  const session = await auth();
  if (!session?.user?.id) {
    return <TerrariumIntro />;
  }

  const uid = session.user.id;
  const { snails } = await svc.getGarden(uid);
  const breedingRequests = await svc.getPendingBreedingRequests(uid);
  const keeperName = session.user.name ?? "Keeper";

  return (
    <Dashboard
      keeperName={keeperName}
      snails={snails}
      breedingRequests={breedingRequests.map((r) => ({
        id: r.id,
        requesterSnailId: r.requesterSnailId,
      }))}
      suggestedName={svc.suggestFounderName()}
    />
  );
}
