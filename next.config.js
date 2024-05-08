const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  experimental: {
    webpackBuildWorker: true
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.devtool = 'source-map';
    }
    config.optimization.minimize = false;

    return config;
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-icons', '@douyinfe/semi-illustrations'],
}

module.exports = nextConfig
