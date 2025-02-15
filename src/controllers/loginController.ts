import axios from "axios";

export class LoginController {
    api_url: string | undefined;

    constructor() {
        this.api_url = `${import.meta.env.VITE_STREAMAPI_URL}${import.meta.env.VITE_STREAMAPI_PREFIX}`;
    }

    async login(username: string, password: string): Promise<any> {
        return await axios.post(`${this.api_url}/stream/login`, {
            username,
            password
        }, {
            headers: { 
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
    }
}