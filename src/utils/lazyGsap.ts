export interface LazyGsap {
    gsap: any;
    ScrollTrigger: any;
}

let _promise: Promise<LazyGsap> | null = null;

/**
 * Resolve GSAP + ScrollTrigger carregados de forma lazy pelo BaseLayout
 * (window.gsap + window.ScrollTrigger + evento gsap:ready via requestIdleCallback).
 * Não importa GSAP estaticamente — evita o chunk de ~69KB no caminho crítico.
 */
export function getLazyGsap(): Promise<LazyGsap> {
    if (!_promise) {
        _promise = resolveGsap();
    }
    return _promise;
}

function resolveGsap(): Promise<LazyGsap> {
    const ready = (): LazyGsap => ({
        gsap: (window as any).gsap,
        ScrollTrigger: (window as any).ScrollTrigger,
    });

    if ((window as any).gsap && (window as any).ScrollTrigger) {
        return Promise.resolve(ready());
    }

    return new Promise((resolve) => {
        const check = () => {
            if ((window as any).gsap && (window as any).ScrollTrigger) {
                resolve(ready());
            } else {
                resolve({ gsap: null, ScrollTrigger: null });
            }
        };
        document.addEventListener("gsap:ready", check, { once: true });
        setTimeout(check, 5000);
    });
}