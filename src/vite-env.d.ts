/// <reference types="vite/client" />

interface RuntimeEnv {
    VITE_STREAMAPI_URL?: string;
    VITE_STREAMAPI_PREFIX?: string;
    VITE_STREAMAPI_PREFIX_ADMIN?: string;
    VITE_DEFAULT_NEXT_EPISODE_OFFSET?: string;
}

interface Window {
    _env_?: RuntimeEnv;
}
