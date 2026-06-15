import axios, { AxiosInstance } from "axios";
import { env } from "../env";

export class GenresController {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${env.VITE_STREAMAPI_URL}${env.VITE_STREAMAPI_PREFIX}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
    }

    async listGenres(): Promise<any> {
        return await this.api.get('/genres')
    }

    async getGenreById(id: string): Promise<any> {
        return await this.api.get(`/genres/${id}`)
    }

    async createGenre(data: any): Promise<any> {
        return await this.api.post('/genres', data)
    }

    async updateGenreById(id: string, data: any): Promise<any> {
        return await this.api.put(`/genres/${id}`, data)
    }

    async deleteGenreById(id: string): Promise<any> {
        return await this.api.delete(`/genres/${id}`)
    }
}