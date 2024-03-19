/** @type {import('next').NextConfig} */
const nextConfig={
    experimental: {
        // add the list of backend dependencies
        serverComponentsExternalPackages: ['sql.js'],
    },
};

module.exports=nextConfig