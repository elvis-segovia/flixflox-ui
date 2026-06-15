import axios, { AxiosInstance } from "axios";
import { env } from "../env";

export class CatalogController {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${env.VITE_STREAMAPI_URL}${env.VITE_STREAMAPI_PREFIX}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
    }

    async listCatalog(): Promise<any> {
        return await this.api.get(`/videos`);
    }

    async listVideosByType(type: string) {
        return await this.api.get(`/videos/${type}/list`)
    }

    async getCatalog(id: string): Promise<any> {
        return await this.api.get(`/videos/${id}/details`);
    }

    async getEpisode(id: string, season: any): Promise<any> {
        return await this.api.get(`/videos/${id}/season/${season}`);
    }

    async createCatalog(data: any): Promise<any> {
        return await this.api.post(`/videos`, data);
    }

    async uploadBG(id: string, data: any): Promise<any> {
        return await this.api.put(`/videos/${id}/bg`, data)
    }

    async uploadFile(data: any): Promise<any> {
        return await this.api.post(`/videos/upload`, data);
    }

}