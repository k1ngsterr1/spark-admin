import axios from "axios";

export async function initiateChangePassword(): Promise<void | string> {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData || !userData.accessToken) {
            throw new Error('No access token found');
        }
        const accessToken = userData.accessToken;

        const response = await axios.post('https://spark-admin-production.up.railway.app/api/auth/initiate-password-change', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        console.log('Data created:', response.data);
        window.location.href = '/change-password';
    } catch (error: any) {
        console.error('Failed to create data:', error);
        if (error.response) {
            return error.response.data.message;
        } else {
            return 'An unexpected error occurred';
        }
    }
}
