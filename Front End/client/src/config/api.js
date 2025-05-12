const BASE_URL = 'http://127.0.0.1:5555/api/v1';

export const BASE_API = "https://eci-jsons-myf8.vercel.app";

export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: `${BASE_URL}/users`,
    signup: `${BASE_URL}/users`,
    updatePassword: `${BASE_URL}/users/update-password`,
    resetPassword: `${BASE_URL}/users/reset-password`,
    otp: `${BASE_URL}/users/otp`,
    verifyOtp: `${BASE_URL}/users/otp/verify`,
    allUsers: `${BASE_URL}/users/all`
  },
  // Products endpoints
  products: {
    list: `${BASE_URL}/products`,
    categories: `${BASE_URL}/products/categories`,
    detail: (id) => `${BASE_URL}/products/${id}`,
    update: (id) => `${BASE_URL}/products/${id}`
  },
  // Orders endpoints
  orders: {
    list: `${BASE_URL}/orders`,
    create: `${BASE_URL}/orders`,
    checkout: `${BASE_URL}/orders/checkout`,
    myOrders: `${BASE_URL}/orders/my-orders`,
    invoices: `${BASE_URL}/orders/invoices`,
    myStore: (storeId) => `${BASE_URL}/orders/my-store/${storeId}`
  },
  // Store endpoints
  store: {
    create: `${BASE_URL}/store`,
    status: `${BASE_URL}/store/status`,
    seed: `${BASE_URL}/store/seed`
  },
  // Transaction endpoints
  transactions: {
    confirm: `${BASE_URL}/transactions/confirm`
  }
};

export const createApiClient = (token = null) => {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return {
    get: async (url) => {
      try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      } catch (error) {
        console.error('API Get Error:', error);
        throw error;
      }
    },
    post: async (url, data) => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      } catch (error) {
        console.error('API Post Error:', error);
        throw error;
      }
    },
    put: async (url, data) => {
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers,
          body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      } catch (error) {
        console.error('API Put Error:', error);
        throw error;
      }
    },
    delete: async (url) => {
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      } catch (error) {
        console.error('API Delete Error:', error);
        throw error;
      }
    }
  };
};