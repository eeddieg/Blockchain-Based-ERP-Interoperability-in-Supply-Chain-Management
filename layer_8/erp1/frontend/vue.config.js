const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        compress: true,
        allowedHosts: ["dev.erp.com", "192.168.110.28"],
        port: 8781,
    },
    configureWebpack: {
        // It will be merged into the final Webpack config
        plugins: [new NodePolyfillPlugin()],
    },
    pages: {
        index: {
            entry: "src/main.ts",
            title: "L8-ERP1",
        }
    },
});