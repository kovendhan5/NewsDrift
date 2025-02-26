/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    images: {
        unoptimized: true,
    },
    assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
    trailingSlash: true,
    env: {
        NEXT_PUBLIC_AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
        NEXT_PUBLIC_AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        NEXT_PUBLIC_AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    },
    // Auth0 requires certain headers for authentication
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY'
                    },
                ],
            },
        ]
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                dns: false,
                net: false,
                fs: false
            };
        }
        return config;
    }
};

export default nextConfig;
