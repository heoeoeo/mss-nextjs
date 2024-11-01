import { QueryClient } from "@tanstack/react-query";

export const queryServerClient = (staleTime = Infinity) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: staleTime * 1000,
      },
    },
  });
};
