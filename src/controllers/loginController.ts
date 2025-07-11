import axios from "axios";

export class LoginController {
    api_url: string | undefined;

    constructor() {
        this.api_url = `${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}`;
    }

    async login(username: string, password: string, role: string = 'viewer'): Promise<any> {
        return await axios.post(`${this.api_url}/auth/login`, {
            username,
            password,
            role
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }

    async checkAuth(): Promise<any> {
        return await axios.get(`${this.api_url}/auth/check`, {
            withCredentials: true
        });
    }

    async refreshToken(): Promise<any> {
        return await axios.post(`${this.api_url}/auth/token/refresh`, {
            headers: {
                'Content-Type': 'application/json'
            },
        }, {
            withCredentials: true
        })
    }

    async logout(): Promise<any> {
        return await axios.delete(`${this.api_url}/auth/logout`, {
            withCredentials: true
        })
    }
}