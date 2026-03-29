export default async function getEnvVar(key: string): Promise<string | undefined> {
    const { env } = await import(/* @vite-ignore */ "cloudflare:workers").catch(() => ({ env: null }));
    return env ? env[key] : (typeof Deno !== "undefined" ? Deno.env.get(key) : undefined);
}

interface ServiceBinding {
    fetch(request: Request | string, init?: RequestInit): Promise<Response>;
}

// Returns the PAYLOAD_CMS service binding when running in Cloudflare Workers,
// or null in dev so callers fall back to a plain fetch with PAYLOAD_URL.
export async function getPayloadBinding(): Promise<ServiceBinding | null> {
    const { env } = await import(/* @vite-ignore */ "cloudflare:workers").catch(() => ({ env: null }));
    return (env?.PAYLOAD_CMS as unknown as ServiceBinding) ?? null;
}