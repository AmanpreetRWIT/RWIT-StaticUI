const express = require("express");
const payload = require("payload");
const next = require("next");
const dotenv = require("dotenv");

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

const start = async () => {
    await app.prepare();
    const server = express();

    // Request logging for debugging
    server.use((req, res, next) => {
        console.log(`[REQUEST] ${req.method} ${req.url}`);
        next();
    });

    // Initialise Payload CMS
    await payload.init({
        secret: process.env.PAYLOAD_SECRET,
        express: server,
        onInit: () => {
            payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
        },
    });

    // Add any custom Express routes here

    // Next.js catch-all
    server.use((req, res, next) => {
        if (req.url.startsWith('/admin') || req.url.startsWith('/api')) {
            return next();
        }
        return handle(req, res);
    });

    server.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
};

start().catch(console.error);
