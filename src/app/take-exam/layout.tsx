import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
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
