import { AxiosInstance, AxiosProgressEvent } from "axios";
import { createApiClient } from "./apiClient";

export class CatalogController {
    api: AxiosInstance;

    constructor() {
        this.api = createApiClient();
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

    async uploadFile(data: any, onUploadProgress?: (event: AxiosProgressEvent) => void): Promise<any> {
        return await this.api.post(`/videos/upload`, data, { onUploadProgress });
    }

    async addEpisode(id: string, data: any, onUploadProgress?: (event: AxiosProgressEvent) => void): Promise<any> {
        return await this.api.put(`/videos/${id}/new-episode`, data, { onUploadProgress });
    }

    async updateEpisode(id: string, season: string, episode: string, data: any): Promise<any> {
        return await this.api.put(`/videos/${id}/season/${season}/episode/${episode}`, data);
    }

}