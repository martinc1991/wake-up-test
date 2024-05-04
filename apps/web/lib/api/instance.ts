import axios, { AxiosInstance } from 'axios'

// interface ApiResponse {
// TODO: Define the structure of your response data here
// }

export const API: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
})
