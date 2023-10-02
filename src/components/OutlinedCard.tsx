import React, { ReactNode } from "react";
import Card from "@mui/material/Card";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const Box: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Card
      onClick={onClick}
      variant="outlined"
      sx={{ padding: "2rem", border: "1px solid black" }}
    >
      {children}
    </Card>
  );
};

export default Box;
