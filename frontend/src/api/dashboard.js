import axiosInstance from './axios';

export const fetchShippingRequests = async (pageNumber) => {
  const response = await axiosInstance.get(`/api/shipping-requests?page=${pageNumber}`);
  return response.data;
};

export const performLogout = async () => {
  await axiosInstance.post('/api/logout');
};
