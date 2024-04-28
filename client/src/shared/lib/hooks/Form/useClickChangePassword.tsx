import {initiateChangePassword} from './useInitiateChangePassword'

export const useClickChangePassword = () => {

    const handleClickChangePassword = async () => {
      try {
        await initiateChangePassword();
      } catch (error) {
        console.error('Error initiating change password:', error);
      }
    };

    return { handleClickChangePassword };
}
