import axios from 'axios';

const api = axios.create({
    baseURL: 'https://coffelybe.onrender.com',
    withCredentials: true,
})

export default api;