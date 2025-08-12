/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   remotePatterns: [
  //     { protocol: 'https', hostname: '**' },
  //   ],
  // },
  async redirects() {
    return [
      {
        source: '/contact',
        destination: '/about',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
