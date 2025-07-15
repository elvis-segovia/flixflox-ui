import axios from "axios";

export class LoginController {
    api_url: string | undefined;

    constructor() {
        this.api_url = `${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}`;
    }

    // Save token to localStorage
    private saveToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    // Get token from localStorage
    private getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    // Remove token from localStorage
    private removeToken(): void {
        localStorage.removeItem('authToken');
    }

    async login(username: string, password: string, role: string = 'viewer'): Promise<any> {
        const response = await axios.post(`${this.api_url}/auth/login`, {
            username,
            password,
            role
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Save token if it exists in the response
        if (response.data && response.data.access_token) {
            this.saveToken(response.data.access_token);
        }

        return response;
    }

    async checkAuth(): Promise<any> {
        const token = this.getToken();
        const headers: any = {
            'Content-Type': 'application/json'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        return await axios.get(`${this.api_url}/auth/check`, {
            headers
        });
    }

    async refreshToken(): Promise<any> {
        const token = this.getToken();
        const headers: any = {
            'Content-Type': 'application/json'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.post(`${this.api_url}/auth/token/refresh`, {}, {
            headers
        });

        // Save new token if it exists in the response
        if (response.data && response.data.access_token) {
            this.saveToken(response.data.access_token);
        }

        return response;
    }

    async logout(): Promise<any> {
        const token = this.getToken();
        const headers: any = {
            'Content-Type': 'application/json'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.delete(`${this.api_url}/auth/logout`, {
            headers
        });

        // Remove token from localStorage on logout
        this.removeToken();

        return response;
    }
}