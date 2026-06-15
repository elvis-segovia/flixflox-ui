import axios, { AxiosInstance } from "axios";
import { env } from "../env";

export class CastController {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${env.VITE_STREAMAPI_URL}${env.VITE_STREAMAPI_PREFIX}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
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