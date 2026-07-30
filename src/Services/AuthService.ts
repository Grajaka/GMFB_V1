import apiClient from "../Hooks/useAxios/apiClient.js";
import type { LoginResponse } from "../Hooks/Validators/User.js";
export const AuthService = {
    login: async (us_User: string, us_Password: string): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>("/api/auth/login/", {
            username: us_User,
            password: us_Password
        });
        return response.data;
    },
    logout: () => {
        return Promise.resolve();
    }
};


