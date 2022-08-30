// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import("@nrwl/next/plugins/with-nx").WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  optimizeFonts: true,
  swcMinify: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
};

if (process.env.NODE_ENV === 'development' && process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
  module.exports = withBundleAnalyzer(withNx(nextConfig));
} else {
  module.exports = withNx(nextConfig);
}
