/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/NewsDrift',
    images: {
        unoptimized: true,
        remotePatterns: [],
    },
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/NewsDrift',
    trailingSlash: true,
    reactStrictMode: true,
}

export default nextConfig;
