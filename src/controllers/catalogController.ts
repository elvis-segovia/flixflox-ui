import axios, { AxiosInstance } from "axios";

export class CatalogController {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}`,
            withCredentials: true
        });
    }

    async listCatalog(): Promise<any> {
        return await this.api.get(`/videos`);
    }

    async listVideosByType(type: string) {
        return await this.api.get(`/videos/${type}/list`)
    }

    async getCatalog(id: string): Promise<any> {
        console.log(id);
        return await this.api.get(`/videos/${id}/details`);
    }

    async getEpisode(id: string, season: any, episode: any): Promise<any> {
        return await this.api.get(`/videos/${id}/season/${season}/episode/${episode}`);
    }

    async createCatalog(data: any): Promise<any> {
        return await this.api.post(`/videos`, data);
    }

    async uploadFile(data: any): Promise<any> {
        return await this.api.post(`/videos/upload`, data);
    }

}