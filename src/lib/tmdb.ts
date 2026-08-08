const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getImageUrl = (
  path: string | null,
  size = "w500"
) => {
  if (!path) return null;

  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};