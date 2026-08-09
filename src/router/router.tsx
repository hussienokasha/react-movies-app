import { createBrowserRouter } from "react-router-dom";

import { Movies } from "../pages/Moives";
import { TvShows } from "../pages/TvShows";
import { Layout } from "../layout/Layout";
import { MovieDetails } from "../pages/MovieDetails";
import { TvDetails } from "../pages/TvDetails";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Movies />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/tv-shows",
        element: <TvShows />,
      },
      {
        path: "/tv-shows/:id",
        element: <TvDetails />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />,
      },
    ],
  },
]);
