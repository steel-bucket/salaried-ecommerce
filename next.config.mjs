import { hostname } from 'node:os'

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'localhost',
                pathname: '**',
                port: '3000',
                protocol: 'http',
            },
        ],
    },
    distDir: 'build',
}


export default nextConfig
