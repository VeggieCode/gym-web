import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'http://localhost/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Antes de que cualquier petición salga de React, Axios la intercepta y le pega el Token.
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});