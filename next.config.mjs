/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.resolve.alias['@metaplex-foundation/mpl-candy-machine'] = false;
    return config;
  },
};

export default nextConfig;
