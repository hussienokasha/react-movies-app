import { Carousel } from "@primereact/ui/carousel";
import { useEffect, useState } from "react";
import { getMovieCast } from "../api/movies.api";
import type { MovieCast } from "../types/movies.types";

import { getImageUrl } from "../../../lib/tmdb";
import { useSlidesPerPage } from "../hooks/useSlidesPerPage";

interface MovieCastProps {
  movieId: string | undefined;
}

export function MovieCast({ movieId }: MovieCastProps) {
  const [movieCast, setMovieCast] = useState<MovieCast[]>([]);
    const slidesPerPage = useSlidesPerPage();
  useEffect(() => {
    const fetchMovieCast = async () => {
      if (!movieId) return;
      const data = await getMovieCast(movieId);
      setMovieCast(data.cast);
    };

    fetchMovieCast();
  }, [movieId]);
  return (
    <div className="container py-5">
      <h2 className="text-2xl font-bold py-4">Cast</h2>
      <Carousel.Root loop slidesPerPage={slidesPerPage}>
        <Carousel.Content>
          {movieCast.map((cast) => (
            <Carousel.Item
              key={cast.id}
              className="bg-white overflow-hidden rounded-xl text-black h-fit"
            >
              <img
                src={getImageUrl(cast.profile_path) ?? ""}
                alt=""
                className="aspect-3/5 w-full object-cover"
              />
              <div className="p-2">
                <p className="text-lg font-semibold line-clamp-1">
                  {cast.name}
                </p>
                <p>{cast.character}</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
      </Carousel.Root>
    </div>
  );
}
