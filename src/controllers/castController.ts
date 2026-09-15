import { AxiosInstance } from "axios";
import { createApiClient } from "./apiClient";

export class CastController {
    api: AxiosInstance;

    constructor() {
        this.api = createApiClient();
    }

    async listCast(): Promise<any> {
        return await this.api.get('/cast')
    }

    async getCastById(id: string): Promise<any> {
        return await this.api.get(`/cast/${id}`)
    }

    async createCast(data: any): Promise<any> {
        return await this.api.post('/cast', data)
    }

    async updateCastById(id: string, data: any): Promise<any> {
        return await this.api.put(`/cast/${id}`, data)
    }

    async deleteCastById(id: string): Promise<any> {
        return await this.api.delete(`/cast/${id}`)
    }
}