import axios, { AxiosInstance } from "axios";

export class ViewersController {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}`,
            withCredentials: true
        });
    }

    async listViewers(): Promise<any> {
        return await this.api.get(`/viewers`);
    }

    async createViewer(viewer: any): Promise<any> {
        return await this.api.post(`/viewers`, viewer);
    }
}