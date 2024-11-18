import { workflowAxiosInstance } from '@/services/apiClient';
import { API_ENDPOINTS } from '@/configs/constants';
import { GoogleUserData } from '@/services/googleAuth/googleAuthTypes';

export const googleSignIn = async (userData: GoogleUserData): Promise<void> => {
  try {
    await workflowAxiosInstance.post(API_ENDPOINTS.GOOGLE_AUTH, userData);
  } catch (error) {
    console.error('An error occurred while calling the Google Auth API to store user data.', error);
    throw error;
  }
};
