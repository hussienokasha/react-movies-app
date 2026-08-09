import { useEffect, useState } from "react";
import { getTvShows } from "../features/tv/api/tv.api";
import type { Tv } from "../features/tv/types/tv.types";

import Card from "../components/Card";
import { Link } from "react-router-dom";
export function TvShows() {
  const [tvShows, setTvShows] = useState<Tv[]>([]);
  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const data = await getTvShows();
        setTvShows(data.results);
      } catch (error) {
        console.error("Error fetching tvShows:", error);
      }
    };

    fetchTvShows();
  }, []);

  return (
    <div>
      <div className="container py-8">
        <h2 className="text-2xl font-bold py-4">Popular TV Shows</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {tvShows.map((tv) => (
            <Link to={`/tv-shows/${tv.id}`} key={tv.id}>
              <Card
                image={tv.poster_path}
                title={tv.name}
                releaseDate={tv.first_air_date}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
