'use server';
import { api } from 'config/axios.config';
import { revalidateDynamicPath } from 'config/axios.config';
import { handleApiError } from 'config/axios.config';
export const createEvent = async (data, fetchPath) => {
  try {
    const response = await api.post('/calendars', data);
    revalidateDynamicPath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// delete
export const deleteEvent = async (id, fetchPath) => {
  try {
    const response = await api.delete(`/calendars/${id}`);
    revalidateDynamicPath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// update
export const updateEvent = async (id, data, fetchPath) => {
  try {
    const response = await api.put(`/calendars/${id}`, data);
    revalidateDynamicPath(fetchPath);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
