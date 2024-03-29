module.exports = {
  i18n: {
    locales: ['en', 'uk'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    return config;
  },
};
