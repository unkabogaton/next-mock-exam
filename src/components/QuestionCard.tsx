"use client";

import React, { useState } from "react";
import OutlinedCard from "@/components/OutlinedCard";
import Choice from "@/components/Choices";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useQuestions } from "@/context/questions/store";

interface QuestionCardProps {
  question?: string;
  choices?: choicesProps[];
  itemNumber: number;
}

interface choicesProps {
  choice: string;
  isSelected: boolean;
  point: number;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { addAnswer } = useQuestions();

  const { itemNumber, question, choices } = props;
  const [reactiveChoices, setReactiveChoices] = useState(choices);
  const selectChoice = (selectedIndex: number) => {
    setReactiveChoices((prevChoices) =>
      prevChoices?.map((item, index) => ({
        ...item,
        isSelected: index === selectedIndex,
      }))
    );
  };

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
              {reactiveChoices?.slice(0, 2).map((choice, index) => (
                <Choice
                  key={index}
                  letter={String.fromCharCode(65 + index)}
                  choice={choice.choice}
                  isSelected={choice.isSelected}
                  selectIndex={() => {
                    selectChoice(index);
                    addAnswer(itemNumber - 1, choice.point);
                  }}
                />
              ))}
            </Grid>
            <Grid item md={6} xs={12}>
              {reactiveChoices?.slice(2, 4).map((choice, index) => (
                <Choice
                  key={index}
                  letter={String.fromCharCode(67 + index)}
                  choice={choice.choice}
                  isSelected={choice.isSelected}
                  selectIndex={() => {
                    selectChoice(index + 2);
                    addAnswer(itemNumber - 1, choice.point);
                  }}
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
