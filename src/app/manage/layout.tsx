"use client";

import { Box } from "@mui/material";
import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function RootLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ minHeight: "100vh" }} mb={15}>
        {children}
      </Box>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
