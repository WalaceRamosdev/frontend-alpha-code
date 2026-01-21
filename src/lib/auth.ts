export async function getSession(request: Request) {
    try {
        const cookie = request.headers.get("cookie");
        // If no cookie, no session possible (unless strategy is different, but for jwt/web it is cookie)
        if (!cookie) return null;

        const origin = new URL(request.url).origin;
        // Fetch session from the API route we implemented manually
        const res = await fetch(`${origin}/api/auth/session`, {
            headers: {
                cookie: cookie
            }
        });

        if (!res.ok) return null;

        const session = await res.json();
        if (!session || Object.keys(session).length === 0) return null;

        return session;
    } catch (e) {
        console.error("Manual getSession failed", e);
        return null;
    }
}
