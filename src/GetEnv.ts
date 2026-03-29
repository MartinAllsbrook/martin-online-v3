export default async function getEnvVar(key: string): Promise<string | undefined> {
    const { env } = await import(/* @vite-ignore */ "cloudflare:workers").catch(() => ({ env: null }));
    return env ? env[key] : (typeof Deno !== "undefined" ? Deno.env.get(key) : undefined);
}