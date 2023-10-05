"use client";

import { QueryClientProvider, QueryClient } from "react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};
