/** @type {import('next').NextConfig} */
const config = {
  swcMinify: false,
  reactStrictMode: false,
  experimental: {
    appDir: false,
    esmExternals: false
  },
  images: {
    domains: ['images.yuvabitcoin.com']
  },
  redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/welcome',
        permanent: true
      }
    ];
  }
};

module.exports = config;

