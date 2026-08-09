import { useEffect, useState } from "react";
import type { TvDetailsResponse } from "../features/tv/types/tv.types";
import { useParams } from "react-router-dom";
import { getTvDetails } from "../features/tv/api/tv.api";
import { StarFill, Youtube } from "@primeicons/react";
import { getImageUrl } from "../lib/tmdb";
import { dialog } from "../features/movies/components/MovieTrailerDialog";


export function TvDetails() {
  const [tv, setTv] = useState<TvDetailsResponse | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    const fetchtvDetails = async () => {
      try {
        const data = await getTvDetails(id);
        setTv(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching tvs:", error);
      }
    };

    fetchtvDetails();
  }, [id]);

  return   <>
      <div className="min-h-fit bg-[#080808] text-white">
        <section className="relative min-h-175 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={getImageUrl(tv?.backdrop_path ?? "", "original") ?? ""}
              alt={tv?.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 bg-linear-to-r from-[#080808] via-[#080808]/70 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 h-80 bg-linear-to-t from-[#080808] to-transparent" />
          </div>

          <div className="relative mx-auto flex min-h-175 max-w-7xl items-end px-4 pb-16 sm:px-6 lg:px-8">
            <div className="grid w-full gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
              <div className="hidden md:block">
                <img
                  src={getImageUrl(tv?.poster_path ?? "", "w500") ?? ""}
                  alt={tv?.name}
                  className="w-full rounded-2xl object-cover shadow-2xl shadow-black/70"
                />
              </div>

              <div className="max-w-3xl self-end">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-md bg-white/10 px-3 py-1 text-sm backdrop-blur">
                    {tv?.status}
                  </span>

                  {tv?.adult && (
                    <span className="rounded-md bg-red-500/20 px-3 py-1 text-sm text-red-300">
                      18+
                    </span>
                  )}

                  <div className="flex items-center gap-1 text-sm text-yellow-400">
                    {tv?.vote_average.toFixed(1)}
                    <StarFill />
                  </div>

                  <span className="text-sm text-white/60">
                    ({tv?.vote_count.toLocaleString()} votes)
                  </span>
                </div>

                <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
                  {tv?.name+" "}
                  (<span className="ps-2" >{tv?.first_air_date?.slice(0, 4)}</span>)
                </h1>

                {tv?.tagline && (
                  <p className="mt-4 text-lg italic text-white/60 sm:text-xl">
                    "{tv?.tagline}"
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    {tv?.first_air_date?.slice(0, 4)}
                  </div>

                 

                  <span>•</span>

                  <span>{tv?.original_language.toUpperCase()}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {tv?.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      dialog.open("trailer", {
                        title: tv?.name + " Trailer",
                        id: id,
                      });
                    }}
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105 hover:bg-white/90"
                  >
                    Watch Trailer
                    <Youtube />
                  </button>

                  <button className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20">
                    Add to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold">About the tv</h2>

              <p className="mt-5 max-w-3xl leading-8 text-white/60">
                {tv?.overview}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-bold">tv Information</h3>

              <div className="mt-6 space-y-5 text-sm">
                

                <div>
                  <p className="text-white/40">Release Date</p>
                  <p className="mt-1 font-medium">{tv?.first_air_date}</p>
                </div>

                <div>
                  <p className="text-white/40">Production</p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {tv?.production_companies.map((company) => (
                      <span
                        key={company.id}
                        className="rounded-md bg-white/5 px-3 py-1.5"
                      >
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white/40">Spoken Languages</p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {tv?.spoken_languages.map((language) => (
                      <span
                        key={language.iso_639_1}
                        className="rounded-md bg-white/5 px-3 py-1.5"
                      >
                        {language.english_name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <dialog.Viewport />
      </div>
      
    </>;
}
