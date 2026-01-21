import { defineMiddleware } from "astro/middleware";
// import authConfig from "./auth.config";

export const onRequest = defineMiddleware(async (context, next) => {
    // Auth checks are handled in individual pages (dashboard.astro) due to auth-astro/server issues in middleware
    return next();
});
