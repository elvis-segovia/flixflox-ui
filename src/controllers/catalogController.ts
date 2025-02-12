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
        return await this.api.get(`/content`);
    }

    async getCatalog(id: string): Promise<any> {
        console.log(id);
        return await this.api.get(`/content/${id}/details`);
    }

    async createCatalog(data: any): Promise<any> {
        return await this.api.post(`/content`, data);
    }

    async uploadFile(data: any): Promise<any> {
        return await this.api.post(`/upload`, data);
    }
    
}