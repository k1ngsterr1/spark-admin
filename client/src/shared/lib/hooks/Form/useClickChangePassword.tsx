import { initiateChangePassword } from "@shared/lib/hooks/Form/useInitiateChangePassword";

export const useClickChangePassword = () => {

    const handleClickChangePassword = async () => {
      try {
        await initiateChangePassword();
      } catch (error) {
        console.error('Error initiating change password:', error);
      }
    };

    return {handleClickChangePassword}
}

