import axios from 'axios';

interface IData {
    code: string[];
}

export async function useEmailConfirm(data: IData): Promise<void | string> {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const accessToken = userData.accessToken;

        const response = await axios.post(
            'https://spark-admin-production.up.railway.app/api/auth/verify',
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        console.log('Data created:', response.data);
        window.location.href = '/websites';

    } catch (error: unknown | any) {
        console.error('Failed to create data:', error);
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
