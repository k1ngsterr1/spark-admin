import { ErrorDetails } from "@core/utils/utils";
import axios from "axios";

export default class RequestManager{
    async postRequest(params: any, body: any, errors: ErrorDetails[]): Promise<void>{
        try {
            const response = await axios.post(params.url, body);
            console.log('Response:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status_code = error.response?.status || 500;
                const message = error.response?.data?.message || 'Произошла неизветсная ошибка';
                errors.push(new ErrorDetails(status_code, message));
            } else {
                errors.push(new ErrorDetails(500, 'Произошла неизветсная ошибка'));
            }
            console.error('Error making POST request:', error.message);
        }
    }
    async getRequest(params: any, errors: ErrorDetails[]): Promise<void>{
        try {
            const response = await axios.get(params.url);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status_code = error.response?.status || 500;
                const message = error.response?.data?.message || 'Произошла неизветсная ошибка';
                errors.push(new ErrorDetails(status_code, message));
            } else {
                errors.push(new ErrorDetails(500, 'Произошла неизвестная ошибка'));
            }
            console.error('Error making POST request:', error.message);
        }
    }
    async deleteRequest(params: any, body: any, errors: ErrorDetails[]): Promise<void>{
        try {
            const response = await axios.delete(params.url, body);
            console.log('Response:', response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const status_code = error.response?.status || 500;
                const message = error.response?.data?.message || 'Произошла неизветсная ошибка';
                errors.push(new ErrorDetails(status_code, message));
            } else {
                errors.push(new ErrorDetails(500, 'Произошла неизветсная ошибка'));
            }
            console.error('Error making POST request:', error.message);
        }
    }
}