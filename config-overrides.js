const path = require("path");
const { alias } = require("react-app-rewire-alias");

module.exports = {
  webpack: (config) => {
    config.ignoreWarnings = [/Failed to parse source map/];

    const modifiedConfig = alias({
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@auth": path.resolve(__dirname, "./src/auth"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@store": path.resolve(__dirname, "./src/redux"),
      "@theme": path.resolve(__dirname, "./src/theme"),
      "@components": path.resolve(__dirname, "./src/components")
    })(config);

    return modifiedConfig;
  }
};
