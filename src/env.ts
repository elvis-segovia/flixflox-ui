// Runtime environment configuration.
//
// Vite inlines `import.meta.env.VITE_*` at build time, so a built image can't
// pick up new values from the deployment. To make a single image configurable
// per environment, `config.js` (generated at container startup from the k8s
// env vars) sets `window._env_`. We read from there at runtime and fall back
// to the build-time values so `npm run dev` keeps working locally.

const runtime = (typeof window !== 'undefined' && window._env_) || {};

function read(key: keyof RuntimeEnv): string {
    return runtime[key] ?? import.meta.env[key] ?? '';
}

export const env = {
    VITE_STREAMAPI_URL: read('VITE_STREAMAPI_URL'),
    VITE_STREAMAPI_PREFIX: read('VITE_STREAMAPI_PREFIX'),
    VITE_STREAMAPI_PREFIX_ADMIN: read('VITE_STREAMAPI_PREFIX_ADMIN'),
    VITE_DEFAULT_NEXT_EPISODE_OFFSET: read('VITE_DEFAULT_NEXT_EPISODE_OFFSET'),
};
