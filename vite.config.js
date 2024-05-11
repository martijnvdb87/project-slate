import { defineConfig } from "vite";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "lib/index.ts"),
            name: "ProjectSlate",
            fileName: "index",
        },
        minify: {
            keep_classnames: true,
        },
    },
    plugins: [
        cssInjectedByJsPlugin(),
        dts({
            rollupTypes: true,
        }),
    ],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "./"),
            },
        ],
    },
    server: {
        host: "127.0.0.1",
        port: 3000,
    },
});
