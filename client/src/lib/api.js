const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function request(endpoint, method = 'GET', body = null, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config = {
    method,
    headers,
    ...options,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! Status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API Request Fail (${method} ${endpoint}):`, error.message);
    throw error;
  }
}

export const api = {
  get: (endpoint, options = {}) => request(endpoint, 'GET', null, options),
  post: (endpoint, body, options = {}) => request(endpoint, 'POST', body, options),
  put: (endpoint, body, options = {}) => request(endpoint, 'PUT', body, options),
  delete: (endpoint, options = {}) => request(endpoint, 'DELETE', null, options),
};
