import { AxiosInstance } from "axios";
import { createApiClient } from "./apiClient";

export class ViewersController {
    api: AxiosInstance;

    constructor() {
        this.api = createApiClient();
    }

    async listViewers(): Promise<any> {
        return await this.api.get(`/viewers`);
    }

    async createViewer(viewer: any): Promise<any> {
        return await this.api.post(`/viewers`, viewer);
    }
}