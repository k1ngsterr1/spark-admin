import axios from 'axios';

const api = axios.create({
    baseURL: 'https://spark-admin-production.up.railway.app/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

function useIsTokenActive(token: string): boolean {
    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return (exp * 1000) > Date.now();
    } catch {
        return false;
    }
}

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token && useIsTokenActive(token)) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export const login = async (username: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { username, password });
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export default api;
