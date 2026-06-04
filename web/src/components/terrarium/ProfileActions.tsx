"use client";

import { useState, useTransition } from "react";
import {
  followAction,
  breedRequestAction,
  reportAction,
} from "@/app/terrarium/actions";

type Props = {
  targetUserId: string;
  targetSnailId: string;
  /** The viewer's snail to pair with, if they keep one. */
  mySnailId: string | null;
  isSelf: boolean;
  initialFollowing: boolean;
};

export function ProfileActions({
  targetUserId,
  targetSnailId,
  mySnailId,
  isSelf,
  initialFollowing,
}: Props) {
  const [following, setFollowing] = useState(initialFollowing);
  const [pending, startTransition] = useTransition();
  const [notice, setNotice] = useState("");

  if (isSelf) {
    return <p className="text-sm text-engravers/55">This is one of your snails.</p>;
  }

  function toggleFollow() {
    startTransition(async () => {
      const res = await followAction(targetUserId);
      if (res.ok) setFollowing((v) => !v);
    });
  }

  function requestPair() {
    if (!mySnailId) return;
    setNotice("");
    startTransition(async () => {
      const res = await breedRequestAction(mySnailId, targetSnailId);
      setNotice(
        res.ok
          ? "Pairing requested. If they accept, you’ll each receive a clutch."
          : res.error ?? "Could not send request.",
      );
    });
  }

  function report() {
    const reason = window.prompt("What's the concern? (a short note for our review)");
    if (!reason) return;
    startTransition(async () => {
      const res = await reportAction("snail", targetSnailId, reason);
      setNotice(res.ok ? "Thank you — our team will review this." : res.error ?? "");
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={toggleFollow}
          className={`text-sm ${following ? "btn-outline" : "btn-tyrian"} disabled:opacity-60`}
        >
          {following ? "Following ✓" : "Follow keeper"}
        </button>
        {mySnailId && (
          <button
            type="button"
            disabled={pending}
            onClick={requestPair}
            className="btn-outline text-sm disabled:opacity-60"
          >
            Request to pair
          </button>
        )}
        <button
          type="button"
          disabled={pending}
          onClick={report}
          className="text-sm text-engravers/55 underline underline-offset-2 hover:text-tyrian"
        >
          ⚐ Report
        </button>
      </div>
      {notice && <p className="text-sm text-tyrian">{notice}</p>}
    </div>
  );
}
