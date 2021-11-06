module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    "@babel/plugin-proposal-nullish-coalescing-operator", //支持??
    "@babel/plugin-proposal-optional-chaining", //支持?.
  ],
};
