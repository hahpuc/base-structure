import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    trailingSlash: false,
    // Generate sitemap during build
    async rewrites() {
        return [
            {
                source: '/sitemap.xml',
                destination: '/api/sitemap',
            },
            {
                source: '/sitemap-static.xml',
                destination: '/api/sitemap?type=static',
            },
            {
                source: '/sitemap-blog.xml',
                destination: '/api/sitemap?type=blog',
            },
            {
                source: '/sitemap-categories.xml',
                destination: '/api/sitemap?type=categories',
            },
            {
                source: '/robots.txt',
                destination: '/api/robots',
            },
        ];
    },
};

export default withNextIntl(nextConfig);