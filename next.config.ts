import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Photos téléversées depuis l'administration (Supabase Storage)
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
