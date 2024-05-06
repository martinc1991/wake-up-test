import axios, { AxiosInstance } from 'axios'

export const API: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
})
