import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Tắt ESLint trong quá trình build và development
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
