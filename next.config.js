/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    // Explicitly add SVG loader rules for React components and URL-based imports
    config.module.rules.push(
      // Handle *.svg imports with ?url (file URL import)
      {
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
        use: ['file-loader'], // Use file-loader for URL-based imports
      },
      // Handle *.svg imports as React components
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'], // Use @svgr/webpack to convert to React components
      },
    );

    return config;
  },
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
