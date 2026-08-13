import { api } from "../../../lib/axios";
import type {
  MoviesResponse,
  MovieDetails,
  MovieVideosResponse,
  MovieCastResponse,
  MovieReviewResponse,
  MovieCategory,
} from "../types/movies.types";

export const getMovies = async (category: MovieCategory) => {
  const response = await api.get<MoviesResponse>(`/movie/${category}`);

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
export const getMovieCast = async (id: string) => {
  const response = await api.get<MovieCastResponse>(`/movie/${id}/credits`);

  return response.data;
};
export const getMovieReviews = async (id: string) => {
  const response = await api.get<MovieReviewResponse>(`/movie/${id}/reviews`);

  return response.data;
};
