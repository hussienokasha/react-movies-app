import { api } from "../../../lib/axios";
import type {
  TvCastResponse,
  TvDetailsResponse,
  TvResponse,
  TvReviewsResponse,
  TvVideosResponse,
} from "../types/tv.types";

export const getTvShows = async (type?: string) => {
  const response = await api.get<TvResponse>(`/tv/${type ?? "popular"}`);

  return response.data;
};
export const getTvDetails = async (id: string) => {
  const response = await api.get<TvDetailsResponse>(`/tv/${id}`);

  return response.data;
};
export const getTvVideos = async (id: string) => {
  const response = await api.get<TvVideosResponse>(`/tv/${id}/videos`);
  return response.data;
};
export const getTvCast = async (id: string) => {
  const response = await api.get<TvCastResponse>(`/tv/${id}/credits`);

  return response.data;
};
export const getTvReviews = async (id: string) => {
  const response = await api.get<TvReviewsResponse>(`/tv/${id}/reviews`);

  return response.data;
};
