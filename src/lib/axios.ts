import axios from "axios";
import { loadingManager } from "./loadingManager";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",

  headers: {
    "Authorization": "Bearer " + import.meta.env.VITE_TMDB_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  loadingManager.start();
  return config;
});

api.interceptors.response.use(
  (response) => {
    loadingManager.stop();
    return response;
  },
  (error) => {
    loadingManager.stop();
    return Promise.reject(error);
  }
);