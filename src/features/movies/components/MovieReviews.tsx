import { useEffect, useState } from "react";
import { getMovieReviews } from "../api/movies.api";
import type { MovieReview } from "../types/movies.types";
import { Carousel } from "@primereact/ui/carousel";
import { ChevronDown, ChevronUp } from "@primeicons/react";
import { getImageUrl } from "../../../lib/tmdb";

export function MovieReviews({ movieId }: { movieId: string | undefined }) {
  const [movieReviews, setMovieReviews] = useState<MovieReview[]>([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      if (!movieId) return;
      const data = await getMovieReviews(movieId);
      setMovieReviews(data.results);
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div className="container py-5">
      <h2 className="text-2xl font-bold py-4">
        Reviews <span>({movieReviews.length}) </span>
      </h2>
      <Carousel.Root
        orientation="vertical"
        slidesPerPage={1.6}
        className="flex flex-col items-center justify-center gap-4"
      >
        <Carousel.Prev className="w-10 h-10 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity">
          <ChevronUp className="text-lg"></ChevronUp>
        </Carousel.Prev>

        <Carousel.Content className="h-80 w-full">
          {movieReviews.map((review) => (
            <Carousel.Item
              key={review.id}
              className="p-5 h-fit bg-linear-to-br from-white to-slate-50 border border-slate-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-y-auto rounded-2xl text-slate-900"
            >
              <div className="min-h-40 flex flex-col gap-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <img
                    src={getImageUrl(review.author_details.avatar_path) ?? ""}
                    alt="author"
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-slate-900">{review.author}</p>
                    <p className="text-xs font-medium text-slate-500">
                      {`created at ${new Date(review.created_at).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-slate-600 whitespace-pre-line">
                  {review.content}
                </p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.Next className="w-10 h-10 flex items-center justify-center rounded-full border border-surface bg-surface-0 dark:bg-surface-800 text-surface-500 dark:text-surface-400 hover:opacity-75 cursor-pointer transition-opacity">
          <ChevronDown className="text-lg"></ChevronDown>
        </Carousel.Next>
      </Carousel.Root>
    </div>
  );
}
