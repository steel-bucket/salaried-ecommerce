import { hostname } from 'node:os'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'


const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, './.env'),
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
            },
            {
                protocol: 'https',
                hostname: 'salaried-ecommerce.onrender.com',
            },
        ],
        // remotePatterns: [
        //     {
        //         hostname: process.env.NODE_ENV === 'development' ? 'localhost' : 'salaried-ecommerce.onrender.com',
        //         pathname: '**',
        //         port: process.env.NODE_ENV === 'development' ? '3000' : '',
        //         protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
        //     },
        // ],
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
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, 'src'),
        };

        return config
    },

    // reactStrictMode: true,
    // swcMinify: true,
    // output: 'standalone',
}
export default nextConfig
