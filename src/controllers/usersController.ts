import axios, { AxiosInstance } from "axios";
import { env } from "../env";

export class UsersController {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: `${env.VITE_STREAMAPI_URL}${env.VITE_STREAMAPI_PREFIX}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
    }

    async listUsers(): Promise<any> {
        return await this.api('/users');
    }

    async getUser(id: string): Promise<any> {
        return await this.api.get(`/users/${id}`);
    }

    async createUser(user: any): Promise<any> {
        return await this.api.post('/users', user);
    }

    async updateUser(id: string, user: any): Promise<any> {
        return await this.api.put(`/users/${id}`, user);
    }

    async deleteUser(id: string): Promise<any> {
        return await this.api.delete(`/users/${id}`);
    }
}