"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import * as svc from "@/lib/terrarium/service";
import { moderateText } from "@/lib/terrarium/moderation";

export type ActionResult = { ok: boolean; error?: string };

async function requireUid(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Please sign in.");
  return session.user.id;
}

export async function adoptAction(name: string): Promise<ActionResult> {
  try {
    const uid = await requireUid();
    const garden = await svc.getGarden(uid);
    if (garden.snails.length > 0) {
      return { ok: false, error: "You already keep a snail." };
    }
    const mod = moderateText(name, { field: "name", max: 30 });
    if (!mod.ok) return { ok: false, error: mod.reason };
    await svc.adoptFounder(uid, mod.value);
    revalidatePath("/terrarium");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function feedAction(
  snailId: string,
  food: "leaf" | "cuttlebone",
): Promise<ActionResult> {
  try {
    const uid = await requireUid();
    await svc.feedSnail(uid, snailId, food);
    revalidatePath("/terrarium");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function estivateAction(
  snailId: string,
  estivating: boolean,
): Promise<ActionResult> {
  try {
    const uid = await requireUid();
    await svc.setEstivation(uid, snailId, estivating);
    revalidatePath("/terrarium");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function renameAction(
  snailId: string,
  name: string,
): Promise<ActionResult> {
  try {
    const uid = await requireUid();
    const mod = moderateText(name, { field: "name", max: 30 });
    if (!mod.ok) return { ok: false, error: mod.reason };
    await svc.renameSnail(uid, snailId, mod.value);
    revalidatePath("/terrarium");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function followAction(targetUserId: string): Promise<ActionResult> {
  try {
    const uid = await requireUid();
    await svc.toggleFollow(uid, targetUserId);
    revalidatePath("/terrarium/garden");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function breedRequestAction(
  mySnailId: string,
  partnerSnailId: string,
): Promise<ActionResult> {
  try {
    const uid = await requireUid();
    await svc.requestBreeding(uid, mySnailId, partnerSnailId);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function breedRespondAction(
  eventId: string,
  accept: boolean,
): Promise<ActionResult> {
  try {
    const uid = await requireUid();
    await svc.respondToBreeding(uid, eventId, accept);
    revalidatePath("/terrarium");
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function reportAction(
  subjectType: "snail" | "user",
  subjectId: string,
  reason: string,
): Promise<ActionResult> {
  try {
    const uid = await requireUid();
    const mod = moderateText(reason, { field: "reason", min: 3, max: 300 });
    if (!mod.ok) return { ok: false, error: mod.reason };
    await svc.fileReport(uid, subjectType, subjectId, mod.value);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
