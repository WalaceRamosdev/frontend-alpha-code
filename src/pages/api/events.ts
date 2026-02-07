import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    // Sanitize inputs: Remove quotes and whitespace that might have come from .env
    const PIXEL_ID = import.meta.env.META_PIXEL_ID?.replace(/["']/g, "").trim();
    const ACCESS_TOKEN = import.meta.env.META_ACCESS_TOKEN?.replace(/["']/g, "").trim();

    if (!PIXEL_ID || !ACCESS_TOKEN) {
        console.error("Meta Pixel ID or Access Token missing in .env");
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
            // test_event_code: "TEST52260", // Uncomment and add your code from Events Manager > Test Events to debug
        };

        console.log(`Sending CAPI event: ${event_name} to Pixel ID: ${PIXEL_ID}`);

        // Using v21.0 standard endpoint
        const fbResponse = await fetch(
            `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            }
        );

        if (!fbResponse.ok) {
            const errorData = await fbResponse.json();
            console.error(`FB CAPI Fail:`, JSON.stringify(errorData, null, 2));

            // Check for specific permission error
            if (errorData.error?.code === 100 && errorData.error?.target === PIXEL_ID) {
                console.error("CRITICAL: The System User (Token Owner) likely does not have permission for this Pixel ID.");
            }
        } else {
            console.log("FB CAPI Success");
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        console.error("CAPI System Error:", error);
        return new Response(JSON.stringify({ success: true, warning: "Handled Error" }), { status: 200 });
    }
};
