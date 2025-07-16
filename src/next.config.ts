import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This allows requests from the development environment's origin.
    allowedDevOrigins: [
        'https://*.cluster-6vyo4gb53jczovun3dxslzjahs.cloudworkstations.dev'
    ]
  }
};

export default nextConfig;
