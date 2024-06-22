import { register } from "module";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const config = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["utfs.io"],
  },
};

export default config;
