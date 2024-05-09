import { defineConfig } from "vite";
import { resolve } from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "./src/lib"),
            formats: ["es"],
        },
    },
    plugins: [cssInjectedByJsPlugin()],
    resolve: {
        alias: [
            {
                find: "@",
                replacement: resolve(__dirname, "./src"),
            },
        ],
    },
    server: {
        host: "127.0.0.1",
        port: 3000,
    },
});
