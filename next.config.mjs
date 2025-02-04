/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'out',
    basePath: '/app',
    images: {
        unoptimized: true,
    }
};

export default nextConfig;
