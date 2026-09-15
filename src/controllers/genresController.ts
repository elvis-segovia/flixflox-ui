import { AxiosInstance } from "axios";
import { createApiClient } from "./apiClient";

export class GenresController {
    api: AxiosInstance;

    constructor() {
        this.api = createApiClient();
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