import axios from 'axios';

interface IData {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export async function useChangePassword(data: IData): Promise<string | void> {
    try {
        const response = await axios.post('https://spark-admin-production.up.railway.app/api/auth/change-password', data);
        console.log('Data created:', response.data);
        window.location.href = '/login';
    } catch (error: any) {
        console.error('Failed to create data:', error);
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
