/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL;

const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/chat",
                destination: API_URL,
            },
        ];
    },
};

export default nextConfig;