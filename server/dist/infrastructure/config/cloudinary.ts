import { ErrorDetails } from '@core/utils/utils';
import {v2 as cloudinary} from 'cloudinary';

export const cloud = cloudinary.config({ 
    cloud_name: 'drxkwolsh', 
    api_key: '341515472312326', 
    api_secret: 'a65zCr98oM8h37pL6_hx1Aq6pho'
});

export async function ImageUpload(path: string, errors: ErrorDetails[]): Promise<string> {
    const result = await cloudinary.uploader.upload(path, function(error) {
        if (error) {
            errors.push(new ErrorDetails(500, "Ошибка при добавление в облако: " + error.message));
        }
    });
    return result.secure_url;
}