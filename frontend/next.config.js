/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'musician-gear-tracker.s3.amazonaws.com',
      'musician-gear-tracker-dev.s3.amazonaws.com'
    ],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  webpack(config) {
    // Enable SVG support
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
};

module.exports = nextConfig;