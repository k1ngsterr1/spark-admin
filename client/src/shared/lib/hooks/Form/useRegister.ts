import axios from 'axios';

interface IData {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export async function useRegister(data: IData): Promise<string | void> {
    try {
        const response = await axios.post('https://spark-admin-production.up.railway.app/api/auth/register', data, {
            headers: {
                'Content-Type': 'application/json'  
            }
        });
        console.log('Data created:', response.data);
        console.log(data);

        // const { username, email, id, accessToken } = response.data;

        // localStorage.setItem('username', username);
        // localStorage.setItem('email', email);
        // localStorage.setItem('userId', id); 
        // localStorage.setItem('accessToken', accessToken);

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
