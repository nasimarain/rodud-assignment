import axiosInstance from './axios';

/**
 * Create a truck request
 * @param {Object} data - The data for creating the truck request
 * @returns {Promise} API response
 */
export const createTruckRequest = async (data) => {
  return axiosInstance.post('/api/shipping-requests', data);
};

/**
 * Fetch details of a specific request
 * @param {number|string} requestId - The ID of the shipping request
 * @returns {Promise<Object>} Request details
 */
export const fetchRequestDetails = async (requestId) => {
  try {
    const response = await axiosInstance.get(`/api/shipping-requests/${requestId}`);
    if (response.data.success) {
      return response.data.data; // Extracting the actual details
    } else {
      throw new Error(response.data.message || 'Failed to fetch request details');
    }
  } catch (error) {
    console.error('Error fetching request details:', error);
    throw error;
  }
};
