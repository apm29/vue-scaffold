const BASE_URL = process.env.NODE_ENV === "production" ? "/" : "/";
const path = require("path");

module.exports = {
  publicPath: BASE_URL,
  assetsDir: "assets",
  productionSourceMap: false,
  devServer: {
    port: 8081,
    open: false,
    host: "0.0.0.0",
    https: false,
    hotOnly: false,
    proxy: {
      "/business": {
        target: "http://axj.ciih.net",
        changeOrigin: true,
      },
    },
  },
  chainWebpack(config) {
    //修改htmlWebpackPlugin
    config.plugin("html").tap((args) => {
      args[0].title = "智安小区招标演示";
      return args;
    });
  },
  configureWebpack: {
    plugins: [],
    context: path.resolve(__dirname, "./"),
    //别名配置
    resolve: {
      extensions: [".js", ".vue"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  },
  pluginOptions: {
    windicss: {
      // see https://github.com/windicss/vite-plugin-windicss/blob/main/packages/plugin-utils/src/options.ts
    },
  },
};
