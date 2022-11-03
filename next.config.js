/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_AUTH_ID: "6bc0e2da-a428-4756-bd67-777326869aaf",
    NEXT_PUBLIC_AUTH_SECRET: "659dd6bad773b4d2de5b75fae07f15bb"
  }
};

module.exports = nextConfig