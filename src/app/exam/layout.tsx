import { Container, Box } from "@mui/material";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Container fixed>
      <Box sx={{ minHeight: "100vh" }} mt={10} mb={15}>
        {children}
      </Box>
    </Container>
  );
}
