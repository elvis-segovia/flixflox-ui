import axios, { AxiosInstance } from "axios";

export class UsersController {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}`,
            withCredentials: true
        });
    }

    async listUsers(): Promise<any> {
        return await this.api('/users');
    }
}