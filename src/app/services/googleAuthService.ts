import { GoogleUserData } from '@/types/googleAuth';
import { axiosInstance } from '@/app/services/apiClient';

export const googleSignIn = async (userData: GoogleUserData): Promise<void> => {
  try {
    await axiosInstance.post('/api/auth/google', userData);
  } catch (error) {
    console.error('An error occurred while calling the Google Auth API to store user data.', error);
    throw error;
  }
};
