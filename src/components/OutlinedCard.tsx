import React, { ReactNode } from "react";
import Card from "@mui/material/Card";

interface Props {
  children: ReactNode;
}

const Box: React.FC<Props> = ({ children }) => {
  return (
    <Card variant="outlined" sx={{ padding: "2rem" }}>
      {children}
    </Card>
  );
};

export default Box;
