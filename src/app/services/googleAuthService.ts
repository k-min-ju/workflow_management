import { GoogleUserData } from '@/types/googleAuth';
import { axiosInstance } from '@/app/services/apiClient';
import { API_ENDPOINTS } from '@/app/configs/constants';

export const googleSignIn = async (userData: GoogleUserData): Promise<void> => {
  try {
    await axiosInstance.post(API_ENDPOINTS.GOOGLE_AUTH, userData);
  } catch (error) {
    console.error('An error occurred while calling the Google Auth API to store user data.', error);
    throw error;
  }
};
