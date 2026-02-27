const { buildConfig } = require("payload/config");
const { mongooseAdapter } = require("@payloadcms/db-mongodb");
const { webpackBundler } = require("@payloadcms/bundler-webpack");
const { slateEditor } = require("@payloadcms/richtext-slate");
const path = require("path");

const Media = require("./collections/Media");
const Sections = require("./collections/Sections");
const Pages = require("./collections/Pages");

module.exports = buildConfig({
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_API_URL
        ? process.env.NEXT_PUBLIC_PAYLOAD_API_URL.replace("/api", "")
        : "http://localhost:3000",

    cors: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],
    csrf: [process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"],

    admin: {
        bundler: webpackBundler(),
        webpack: (config) => ({
            ...config,
            resolve: {
                ...config.resolve,
                symlinks: false,
                modules: [
                    path.resolve(__dirname, 'node_modules/react-18'),
                    path.resolve(__dirname, 'node_modules/react-dom-18'),
                    path.resolve(__dirname, 'node_modules'),
                    'node_modules',
                ],
                alias: {
                    ...config.resolve?.alias,
                    react: path.resolve(__dirname, "node_modules/react-18"),
                    "react-dom": path.resolve(__dirname, "node_modules/react-dom-18"),
                    "react/jsx-runtime": path.resolve(__dirname, "node_modules/react-18/jsx-runtime"),
                    "react/jsx-dev-runtime": path.resolve(__dirname, "node_modules/react-18/jsx-dev-runtime"),
                    "react-is": path.resolve(__dirname, "node_modules/react-is"),
                    "react-dom/client": path.resolve(__dirname, "node_modules/react-dom-18/client"),
                    "react-dom/index": path.resolve(__dirname, "node_modules/react-dom-18/index.js"),
                    "@payloadcms/live-preview-react": path.resolve(__dirname, "node_modules/@payloadcms/live-preview-react"),
                },
                fallback: {
                    ...config.resolve?.fallback,
                    react: path.resolve(__dirname, "node_modules/react-18"),
                    "react-dom": path.resolve(__dirname, "node_modules/react-dom-18"),
                }
            },
        }),
    },

    editor: slateEditor({}),

    db: mongooseAdapter({
        url: process.env.MONGODB_URI,
    }),

    collections: [Media, Sections, Pages],

    upload: {
        limits: {
            fileSize: 5000000, // 5MB
        },
    },

    typescript: {
        outputFile: path.resolve(__dirname, "payload-types.ts"),
    },
});
