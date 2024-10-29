import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{ hostname: "shopping-phinf.pstatic.net" }],
  },
};

export default nextConfig;
