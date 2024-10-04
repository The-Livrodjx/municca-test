import axios from 'axios';

const url = process.env.API_URL || "http://localhost:3333";

const api = axios.create({
  baseURL: url
});

export default api;