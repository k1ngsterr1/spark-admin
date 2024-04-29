import {useInitiateChangePassword} from './useInitiateChangePassword'

export const useClickChangePassword = () => {

  const initiateChangePassword = useInitiateChangePassword();

    const handleClickChangePassword = async () => {
      try {
        await initiateChangePassword();
      } catch (error) {
        console.error('Error initiating change password:', error);
      }
    };

    return { handleClickChangePassword };
}