import { Times } from "@primeicons/react/times";
import { createOverlayManager } from "@primereact/core/overlay-manager";
import { Button } from "@primereact/ui/button";
import { Dialog } from "@primereact/ui/dialog";
import { getMovieVideos } from "../api/movies.api";
import { useEffect, useState } from "react";
import type { MovieVideo } from "../types/movies.types";

interface DialogPayload {
  title: string | undefined;
  id: string | undefined;
}
export const dialog = createOverlayManager<DialogPayload>(
  ({ title, id, ...rest }) => {
    const [movieVideos, setMovieVideos] = useState<MovieVideo[]>([]);
    useEffect(() => {
      const fetchMovieVideos = async () => {
        try {
          if (!id) return;
          const data = await getMovieVideos(id);
          setMovieVideos(data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchMovieVideos();
    }, [id]);

    const officialTrailer =
      movieVideos.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.official,
      ) ??
      movieVideos.find(
        (video) => video.site === "YouTube" && video.type === "Trailer",
      );

    const trailerKey = officialTrailer?.key ?? movieVideos[0]?.key;

    return (
      <Dialog.Root {...rest}>
        <Dialog.Portal>
          <Dialog.Backdrop className="bg-black/55 backdrop-blur-sm" />

          <Dialog.Positioner className="p-0">
            <Dialog.Popup
              className="
          w-full
          max-w-4xl
          overflow-hidden
          rounded-xl
          bg-surface
          shadow-2xl
        "
            >
              <Dialog.Header className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 p-1!">
                <Dialog.Title className="truncate text-lg font-semibold sm:text-xl ">
                  {title}
                </Dialog.Title>

                <Dialog.HeaderActions>
                  <Dialog.Close
                    as={Button}
                    rounded
                    variant="text"
                    iconOnly
                    aria-label="Close dialog"
                  >
                    <Times />
                  </Dialog.Close>
                </Dialog.HeaderActions>
              </Dialog.Header>

              <Dialog.Content className="p-0!">
                {movieVideos.length > 0 && trailerKey ? (
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title={`${title} Trailer`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-black/5 p-6 text-center">
                    <p className="text-sm text-gray-500">
                      No trailer available for this movie.
                    </p>
                  </div>
                )}
              </Dialog.Content>
            </Dialog.Popup>
          </Dialog.Positioner>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);
