import axios from "axios";
import { Image } from '../types/components.ts'

const API_URL = 'http://localhost:3100';

export const getAllImages = async (): Promise<Image[]> => {
  try {
    const response = await axios.get<Image[]>(`${API_URL}/images`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in getAllImages', error);
    throw error;
  }
};

export const likeImage = async (id: number) => {
  try {
    await axios.post(`${API_URL}/images/${id}/likes`, {
      body: {}
    });
  } catch (error) {
    console.error(`Error linking image with ID ${id}`, error);
    throw error;
  }
}