import { QueryClient } from "@tanstack/react-query";

export const queryServerClient = (seconds = 60) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: seconds * 1000,
      },
    },
  });
};
