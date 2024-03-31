/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: { ignoreBuildErrors: true },
    experimental: {
        serverComponentsExternalPackages: ['sql.js'],
    },
     webpack: (config, { isServer }) => {
    // If in client, don't use fs module in npm
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};

module.exports = nextConfig