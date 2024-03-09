function NextConfig(config) {
  return config;
}

export default NextConfig({
  reactStrictmode: true,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
});
