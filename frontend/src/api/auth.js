import axiosInstance from './axios';

export const register = async (data) => {
  return axiosInstance.post('/api/register', data);
};

export const login = async (email, password) => {
  return await axiosInstance.post('/api/login', { email, password });
};

export const logout = async () => {
  return await axiosInstance.post('/api/logout');
};
