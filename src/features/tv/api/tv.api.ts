import { api } from "../../../lib/axios";
import type { TvResponse } from "../types/tv.types";

export const getTvShows = async (type?: string) => {
  const response = await api.get<TvResponse>(`/tv/${type ?? "popular"}`);

  return response.data;
};
