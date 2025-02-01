import axios, { AxiosInstance } from "axios";

export class CatalogController {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}`,
            withCredentials: true
        });
    }

    async getCatalog(): Promise<any> {
        return await this.api.get(`/content`);
    }

    async createCatalog(data: any): Promise<any> {
        return await this.api.post(`/content`, data);
    }

    async uploadFile(data: any): Promise<any> {
        return await this.api.post(`/upload`, data);
    }
    
}