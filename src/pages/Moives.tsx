import { useEffect, useState } from "react";
import { getMovies } from "../features/movies/api/movies.api";
import type { Movie } from "../features/movies/types/movies.types";

import Card from "../components/Card";
import { Link } from "react-router-dom";



export function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div>
        <div className="container py-8">
          <h2 className="text-2xl font-bold py-4">Popular Movies</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <Link to={`/movies/${movie.id}`} key={movie.id}>
                <Card
                  image={movie.poster_path}
                  title={movie.title}
                  releaseDate={movie.release_date}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      
    </>
  );
}
