import axios, {type AxiosInstance } from 'axios';


const apiClient: AxiosInstance = axios.create({
    baseURL: "http://10.1.1.14:8000/",
    //import.meta.env.VITE_API_BASE_URL
    headers: {
        'Content-Type': 'application/json', //APIrest common response json type
    },
});

// Interceptor para tokens (opcional pero común)
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

{/*
This is a **request interceptor**.
An interceptor lets you modify every request before it is sent.
Here, before each request:
1. It reads a token from `localStorage`.
2. If a token exists, it adds an `Authorization` header.
3. The request continues with the modified config.

So every request made with can automatically include authentication: `apiClient`

*/}

export default apiClient;