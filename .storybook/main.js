module.exports = {
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: "awesome-typescript-loader",
        },
      ],
    });
    config.module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ["style-loader", "css-loader", "sass-loader"],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
  stories: ["../src/**/*.stories.*"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-a11y"],
};
