import axios from 'axios';


export async function initiateChangePassword(): Promise<void | string> {
    try {
        const response = await axios.post('https://spark-admin-production.up.railway.app/api/auth/initiate-password-change');
        console.log('Data created:', response.data);
        window.location.href = '/change-password';

        const userData = {
            email: response.data.user.email,
            accessToken: response.data.accessToken,
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));

    } catch (error: unknown | any) {
        console.error('Failed to create data:', error);
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
