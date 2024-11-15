import { hostname } from 'node:os'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'node:url'


const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);


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
    webpack: (config, { isServer }) => {
        if (config.optimization.splitChunks) {
            config.optimization.splitChunks.cacheGroups = {
                defaultVendors: false,
            }
        }

        if (!isServer) {
            config.resolve.alias['@payloadcms'] = path.resolve(
                __dirname,
                'node_modules/@payloadcms'
            )
        }

        return config
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/api/:path*',
    //             destination: 'http://localhost:3000/:path*'
    //         }
    //     ];
    // },
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
}

export default nextConfig
