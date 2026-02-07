import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const PIXEL_ID = import.meta.env.META_PIXEL_ID;
    const ACCESS_TOKEN = import.meta.env.META_ACCESS_TOKEN;

    if (!PIXEL_ID || !ACCESS_TOKEN) {
        console.error("Meta Pixel ID or Access Token missing");
        return new Response(JSON.stringify({ message: "Configuration Error" }), { status: 500 });
    }

    try {
        const body = await request.json();
        const { event_name, event_source_url, user_data, custom_data } = body;

        const payload = {
            data: [
                {
                    event_name,
                    event_time: Math.floor(Date.now() / 1000),
                    event_source_url,
                    action_source: "website",
                    user_data: {
                        client_ip_address: request.headers.get("x-forwarded-for") || request.headers.get("cf-connecting-ip") || "0.0.0.0",
                        client_user_agent: request.headers.get("user-agent") || "unknown",
                        ...user_data,
                    },
                    custom_data,
                },
            ],
        };

        console.log(`Sending CAPI event: ${event_name}`);

        // Non-blocking fetch (we don't await the result strictly for the user response, but for logging)
        const fbResponse = await fetch(
            `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );

        if (!fbResponse.ok) {
            const errorText = await fbResponse.text();
            console.error(`FB CAPI Error: ${errorText}`);
            // return success to frontend to avoid breaking UX
        } else {
            console.log("FB CAPI Success");
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error("CAPI Handler Error:", error);
        // Silent fail for the user
        return new Response(JSON.stringify({ success: true, warning: "Handled Error" }), { status: 200 });
    }
};
