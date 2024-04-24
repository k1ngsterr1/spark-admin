import axios from 'axios';

interface IData {
    email: string;
    password: string;
}

export async function useLogin(data: IData): Promise<string | void> {
    try {
        const response = await axios.post('https://spark-admin-production.up.railway.app/api/login', data);
        console.log('Data created:', response.data);
        window.location.href = '/YOUR_SUCCESS_ROUTE';
    } catch (error: unknown | any) {
        console.error('Failed to create data:', error);
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
