"use server";
import { api } from 'config/axios.config';
import { revalidateDynamicPath } from 'config/axios.config';
import { handleApiError } from 'config/axios.config';


export const registerUser = async (data) => {
  console.log('registerUser req:', data);
  try {
    const response = await api.post('/auth/email/register', data);
    console.log('registerUser res:', response.data);
    return response.data;
  } catch (error) {
    console.log('Error!!', error);
    throw error;
  }
};
export const signInUser = async (provider, data) => {
  console.log('signInUser req:', data);
  switch (provider) {
    case 'email':
      try {
        const response = await api.post('/auth/email/login', data);
        console.log('signInUser email res:', response.data);
        console.log('ok');
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    case 'google':
      try {
        const response = await api.post('/auth/google/login', data);
        console.log('signInUser google res:', response.data);
        console.log('ok');
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    case 'facebook':
      try {
        const response = await api.post('/auth/facebook/login', data);
        console.log('signInUser facebook res:', response.data);
        console.log('ok');
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }

    case 'twitter':
      try {
        const response = await api.post('/auth/twitter/login', data);
        console.log('signInUser twitter res:', response.data);
        console.log('ok');
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
  }
};
export const forgotUser = async (email) => {
  console.log('forgotUser req:', email);
  try {
    const response = await api.post('/auth/forgot/password', email);
    console.log('forgotUser res:', response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const resetUserPass = async (password, hash) => {
  console.log('resetUserPass req:', password, hash);
  try {
    const response = await api.post('/auth/reset/password', {
      password: password,
      hash: hash,
    });
    console.log('resetUserPass res:', response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const confirmEmail = async (hash) => {
  console.log('confirmEmail req:', hash);
  try {
    const response = await api.post('/auth/email/confirm', { hash: hash });
    console.log('confirmEmail res:', response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateUserAction = async (userDto, oldToken) => {
  console.log('updateUserAction req:', userDto, oldToken);
  try {
    const response = await api.patch('/auth/me', userDto, {
      headers: {
        Authorization: `Bearer ${oldToken}`,
      },
    });
    console.log('updateUserAction res:', response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const updateUserImage = async (id, file, oldToken) => {
  console.log('updateUserImage req:', id, file, oldToken);
  try {
    const response = await api.patch(`/auth/upload/${id}`, file, {
      headers: {
        Authorization: `Bearer ${oldToken}`,
      },
    });
    console.log('updateUserImage res:', response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const deleteUser = async (user, token) => {
  console.log('deleteUser req:', user, token);
  try {
    const response = await api.delete(`/auth/me/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('deleteUser res:', response.data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
