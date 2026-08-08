import { api } from "../../../lib/axios";
import type {
  MoviesResponse,
  MovieDetails,
  MovieVideosResponse,
} from "../types/movies.types";

export const getMovies = async (type?: string) => {
  const response = await api.get<MoviesResponse>(`/movie/${type ?? "popular"}`);

  return response.data;
};
export const getMovieDetails = async (id: string) => {
  const response = await api.get<MovieDetails>(`/movie/${id}`);

  return response.data;
};
export const getMovieVideos = async (id: string) => {
  const response = await api.get<MovieVideosResponse>(`/movie/${id}/videos`);

  return response.data;
};
