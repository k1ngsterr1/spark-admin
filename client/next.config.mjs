function NextConfig(config) {
  return {
    ...config,
    typescript: {
      // Disable TypeScript errors halting the build
      // !! Use with caution !!
      ignoreBuildErrors: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },
  };
}

export default NextConfig({});
