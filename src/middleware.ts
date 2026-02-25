import { defineMiddleware } from "astro/middleware";
import { getSession } from "./lib/auth";

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;

    // Protect all /admin/* routes — only ADMIN role allowed
    if (pathname.startsWith("/admin")) {
        try {
            const session = await getSession(context.request);
            if (!session || session.user?.role !== "ADMIN") {
                return context.redirect("/dashboard");
            }
        } catch {
            return context.redirect("/login");
        }
    }

    // Protect /dashboard and /perfil — must be logged in
    if (pathname === "/dashboard" || pathname === "/perfil") {
        try {
            const session = await getSession(context.request);
            if (!session) {
                return context.redirect("/login");
            }
        } catch {
            return context.redirect("/login");
        }
    }

    return next();
});
