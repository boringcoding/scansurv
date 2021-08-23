const path = require("path");

module.exports = {
  webpack: (config, webpack) => {
    config.module.rules.push({
      test: /\.m?js$/,
      // include strapi-plugin-vercel
      include: [path.resolve("node_modules/strapi-plugin-vercel")],
      // exclude it from node_moduels exclusions which are excluded by default by Strapi
      exclude: /node_modules\/(?!(strapi-plugin-vercel)\/).*/,
      // Grabbed rest of following config from strapi-admin/webpack.config.js...
      use: {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [
            require.resolve("@babel/preset-env"),
            require.resolve("@babel/preset-react"),
          ],
          plugins: [
            require.resolve("@babel/plugin-proposal-class-properties"),
            require.resolve("@babel/plugin-syntax-dynamic-import"),
            require.resolve("@babel/plugin-transform-modules-commonjs"),
            require.resolve("@babel/plugin-proposal-async-generator-functions"),
            [
              require.resolve("@babel/plugin-transform-runtime"),
              {
                helpers: true,
                regenerator: true,
              },
            ],
          ],
        },
      },
    });

    return config;
  },
};
