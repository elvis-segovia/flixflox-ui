import axios, { AxiosInstance } from "axios";

export class ViewersController {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
    }

    async listViewers(): Promise<any> {
        return await this.api.get(`/viewers`);
    }

    async createViewer(viewer: any): Promise<any> {
        return await this.api.post(`/viewers`, viewer);
    }
}