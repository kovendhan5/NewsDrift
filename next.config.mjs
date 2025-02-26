/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    images: {
        unoptimized: true,
        domains: [
            'images.unsplash.com',
            'source.unsplash.com',
            'cdn.pixabay.com',
            'www.reuters.com',
            'www.nytimes.com',
            'www.theguardian.com',
            'www.bbc.co.uk',
            'techcrunch.com',
            'i.kinja-img.com',
            'cdn.cnn.com',
            'media.wired.com',
            'images.wsj.net',
            'img.huffingtonpost.com',
            'static01.nyt.com',
            'media.npr.org',
            'assets.bwbx.io',
            'ichef.bbci.co.uk',
            'assets.publishing.service.gov.uk',
            'storage.googleapis.com',
            's.yimg.com',
            'assets.example.com'
        ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
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
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        serverActions: true,
    },
};

export default nextConfig;
