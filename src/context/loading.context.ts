import { createContext, useContext } from "react";

type LoadingContextType = {
  isLoading: boolean;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined,
);

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }

  return context;
}
