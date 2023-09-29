"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

interface ChoiceProps {
  letter: string;
  choice: string;
  isSelected: boolean;
  selectIndex?: () => void;
}

const Choice = (props: ChoiceProps) => {
  const { letter, choice, isSelected, selectIndex } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        mr={1}
        p={1}
        sx={{
          backgroundColor: isHovered ? "#f5f5f5" : "white",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={selectIndex}
      >
        <Box
          justifyContent="center"
          alignItems="center"
          display="flex"
          borderRight={isHovered || isSelected ? 0 : 1}
          sx={{
            width: "1.5em",
            height: "1.5em",
            backgroundColor: isHovered || isSelected ? "#101828" : "white",
            color: isHovered || isSelected ? "white" : "#101828",
          }}
        >
          <Typography fontSize={20} fontWeight="medium">
            {letter}
          </Typography>
        </Box>
        <Typography ml={4} fontSize={16} fontWeight="light">
          {choice}
        </Typography>
      </Box>
    </>
  );
};

export default Choice;
