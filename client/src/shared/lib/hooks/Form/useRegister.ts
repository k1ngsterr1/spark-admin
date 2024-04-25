import axios from 'axios';

interface IData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export async function useRegister(data: IData): Promise<string | void> {
    try {
        const response = await axios.post('https://spark-admin-production.up.railway.app/api/register', data);
        console.log('Data created:', response.data);
        window.location.href = '/email-confirmation';
    } catch (error: any) {
        console.error('Failed to create data:', error);
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
