/// <reference path="../.astro/types.d.ts" />

import type { gsap as GsapType, ScrollTrigger as ScrollTriggerType } from "gsap";

declare global {
    interface Window {
        gsap?: typeof GsapType;
        ScrollTrigger?: typeof ScrollTriggerType;
        __gsapLoaded?: boolean;
        __gsapLoading?: boolean;
        showToast?: (message: string, type?: "success" | "error") => void;
        dataLayer?: unknown[];
    }
}

export {};
