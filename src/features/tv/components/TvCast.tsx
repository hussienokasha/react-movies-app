import { Carousel } from "@primereact/ui/carousel";
import { useEffect, useState } from "react";

import type { TvCast } from "../types/tv.types";

import { getImageUrl } from "../../../lib/tmdb";
import { useSlidesPerPage } from "../../../hooks/useSlidesPerPage";
import { getTvCast } from "../api/tv.api";

export function TvCast({ tvId }: { tvId : string | undefined }) {
  const [tvCast, setTvCast] = useState<TvCast[]>([]);
  const slidesPerPage = useSlidesPerPage();
  useEffect(() => {
    const fetchMovieCast = async () => {
      if (!tvId) return;
      const data = await getTvCast(tvId);
      
      setTvCast(data.cast);
    };

    fetchMovieCast();
  }, [tvId]);
  return (
    <div className="container py-5">
      <h2 className="text-2xl font-bold py-4">Cast</h2>
      <Carousel.Root loop slidesPerPage={slidesPerPage}>
        <Carousel.Content>
          {tvCast.map((cast) => (
            <Carousel.Item
              key={cast.id}
              className="bg-white border border-gray-200 overflow-hidden rounded-xl text-black h-fit"
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
