import { signIn } from "@/auth";

/**
 * Public Terrarium landing — frames WHY a welfare org built a game where you
 * cannot harm a snail, then offers OAuth sign-in. Sign-in uses inline server
 * actions; only the chosen display name is ever shown publicly.
 */
export function TerrariumIntro() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="eyebrow mb-4">The Terrarium</p>
      <h1 className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[1.05]">
        A game where you cannot harm a snail.
      </h1>
      <div className="prose-swa mt-8 max-w-none">
        <p>
          Out there, snails are boiled, milked, and gutted for profit. In here,
          the snail is an <strong>end, never a means</strong>. You care for one —
          and, over time, a small lineage — that lives on between your visits.
        </p>
        <p>
          There is no way to lose. Wander off for weeks and you&rsquo;ll return to
          find your snail safely <strong>estivating</strong> — sealed in its
          shell, resting, unharmed. No streaks. No guilt. No nagging. Slowness is
          the whole point. The only thing that ever ends a snail&rsquo;s story
          here is a long, gentle old age — and even then, its descendants carry on.
        </p>
        <p>
          An anti-exploitation campaign has no business shipping an
          attention-exploitation game. So we didn&rsquo;t. Come keep a snail the
          way snails deserve to be kept.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/terrarium" });
          }}
        >
          <button type="submit" className="btn-tyrian w-full justify-center sm:w-auto">
            Sign in with Google
          </button>
        </form>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/terrarium" });
          }}
        >
          <button type="submit" className="btn-outline w-full justify-center sm:w-auto">
            Sign in with GitHub
          </button>
        </form>
      </div>
      <p className="mt-4 text-sm text-engravers/60">
        We use your sign-in only to create your keeper account. Your real name and
        email are never shown publicly — only the display name you choose.
      </p>
    </div>
  );
}
