import axios, { AxiosInstance } from "axios";
import { env } from "../env";

/**
 * Creates an axios instance for the stream API.
 *
 * The auth token is read on every request instead of when the instance is
 * created: controllers are instantiated at module scope, which happens on app
 * boot (before login), so a header baked in at construction time would stay
 * `Bearer null` until a full page reload.
 */
export const createApiClient = (): AxiosInstance => {
    const api = axios.create({
        baseURL: `${env.VITE_STREAMAPI_URL}${env.VITE_STREAMAPI_PREFIX}`
    });

    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return api;
}
