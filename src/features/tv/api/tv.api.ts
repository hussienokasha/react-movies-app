import { api } from "../../../lib/axios";
import type { TvDetailsResponse, TvResponse, TvVideosResponse } from "../types/tv.types";

export const getTvShows = async (type?: string) => {
  const response = await api.get<TvResponse>(`/tv/${type ?? "popular"}`);

  return response.data;
};
export const getTvDetails = async (id: string) => {
  const response = await api.get<TvDetailsResponse>(`/tv/${id}`);

  return response.data;
};
export const getMovieVideos = async (id: string) => {
  const response = await api.get<TvVideosResponse>(`/tv/${id}/videos`);

  return response.data;
};