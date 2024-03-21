/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: { ignoreBuildErrors: true },
    experimental: {
        // add the list of backend dependencies
        serverComponentsExternalPackages: ['sql.js'],
    },
};

module.exports = nextConfig