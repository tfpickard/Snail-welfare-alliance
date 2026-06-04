import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Superseded routes → their canonical replacements.
      { source: "/the-facts", destination: "/the-case", permanent: true },
      { source: "/donate", destination: "/take-action", permanent: true },
    ];
  },
};

export default nextConfig;
