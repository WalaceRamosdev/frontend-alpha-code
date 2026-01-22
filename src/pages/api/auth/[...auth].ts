import { Auth } from "@auth/core";
import type { APIRoute } from "astro";
import authConfig from "../../../../auth.config";

export const ALL: APIRoute = async ({ request }) => {
    return Auth(request, authConfig) as Promise<Response>;
};
