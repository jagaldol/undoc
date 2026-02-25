/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL

const nextConfig = {
  async rewrites() {
    if (!API_URL) {
      return []
    }

    return [
      {
        source: "/api/chat",
        destination: API_URL,
      },
    ]
  },
}

export default nextConfig
