/** @type {import('next').NextConfig} */
const nextConfig={
    eslint: {
        ignoreDuringBuilds: true
    },
    experimental: {
        // add the list of backend dependencies
        serverComponentsExternalPackages: ['sql.js'],
    },
};

module.exports=nextConfig