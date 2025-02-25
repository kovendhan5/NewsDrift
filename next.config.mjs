/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/NewsDrift',
    images: {
        unoptimized: true,
    },
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '/NewsDrift',
}

export default nextConfig;
