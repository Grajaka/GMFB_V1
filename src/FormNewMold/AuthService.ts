import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL;

export const loginApi = async (username: string, password: string) => {
    try {
        const response = await axios.post(api, { username, password });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}