import { notFound } from "next/navigation";
import { TERRARIUM_ENABLED } from "@/lib/site";

/** 404 the Terrarium routes unless the feature flag is on. */
export function assertTerrariumEnabled(): void {
  if (!TERRARIUM_ENABLED) notFound();
}
