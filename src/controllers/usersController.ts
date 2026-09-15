import { AxiosInstance } from "axios";
import { createApiClient } from "./apiClient";

export class UsersController {
    api: AxiosInstance;

    constructor() {
        this.api = createApiClient();
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