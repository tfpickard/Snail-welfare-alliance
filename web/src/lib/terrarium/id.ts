/**
 * Compact, URL-safe unique id. Uses the platform crypto (Node 19+ / edge).
 * Not a security token — just a collision-resistant identifier for rows.
 */
export function createId(): string {
  // 24 chars of base36 from random bytes.
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let out = "";
  for (const b of bytes) out += b.toString(36).padStart(2, "0");
  return out.slice(0, 24);
}
