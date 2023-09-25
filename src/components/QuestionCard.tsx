"use client";

import React, { useState } from "react";
import OutlinedCard from "./OutlinedCard";
import Choice from "./Choices";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface QuestionCardProps {
  itemNumber: number;
  question: string;
  choices: choicesProps[];
}

interface choicesProps {
  choice: string;
  isSelected: boolean;
  point: number;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { itemNumber, question, choices } = props;
  const [reactiveChoice, setReactiveChoice] = useState(choices);
  return (
    <>
      <Box my={4}>
        <OutlinedCard>
          <Typography fontWeight="light" variant="caption">
            Question {itemNumber}
          </Typography>
          <Typography gutterBottom mb={1} fontSize={20}>
            {question}
          </Typography>
          <Grid container>
            <Grid item md={6} xs={12}>
              {choices?.slice(0, 2).map((choice, index) => (
                <Choice
                  key={index}
                  letter={String.fromCharCode(65 + index)}
                  choice={choice.choice}
                  isSelected={choice.isSelected}
                />
              ))}
            </Grid>
            <Grid item md={6} xs={12}>
              {choices?.slice(2, 4).map((choice, index) => (
                <Choice
                  key={index}
                  letter={String.fromCharCode(67 + index)}
                  choice={choice.choice}
                  isSelected={choice.isSelected}
                />
              ))}
            </Grid>
          </Grid>
        </OutlinedCard>
      </Box>
    </>
  );
};

export default QuestionCard;
