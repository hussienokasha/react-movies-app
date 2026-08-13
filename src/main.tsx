import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "@primereact/core";
import Nora from "@primeuix/themes/nora";

import { router } from "./router/router";
import { LoadingProvider } from "./context/loading.context";

const primereact = {
  theme: {
    preset: Nora,
    options: {
      darkModeSelector: "none",
    },
  },

  license: "PrimeUI-Commercial-Key...",
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider {...primereact}>
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
    </PrimeReactProvider>
  </StrictMode>,
);