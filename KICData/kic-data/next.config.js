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
};

module.exports = nextConfig