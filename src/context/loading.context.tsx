import { useEffect, useState } from "react";
import { loadingManager } from "../lib/loadingManager";
import { Loader } from "../features/movies/components/Loader";
import { LoadingContext } from "./loading.context";

export function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadingManager.setStartLoading(() => setIsLoading(true));
    loadingManager.setStopLoading(() => setIsLoading(false));

    return () => {
      loadingManager.setStartLoading(() => {});
      loadingManager.setStopLoading(() => {});
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}

      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
}