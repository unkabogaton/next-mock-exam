"use client";

import React, { useState } from "react";
import OutlinedCard from "@/components/OutlinedCard";
import Choice from "@/screens/Exam/Choices";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useQuestions } from "@/context/questions/store";
import { QuestionsTypes } from "@/types/questions";

interface QuestionCardProps extends QuestionsTypes {
  questionId: number;
  selectChoice: (questionId: number, choice: string, point: number) => void;
}

const QuestionCard = (props: QuestionCardProps) => {
  const { addAnswer } = useQuestions();

  const { question, choices, questionId, selectChoice } = props;

  return (
    <>
      <section id={`${questionId + 1}`}>
        <Box my={4}>
          <OutlinedCard>
            <Typography fontWeight="light" variant="caption">
              Question {questionId + 1}
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
                    isSelected={choice.isSelected!}
                    questionId={questionId}
                    selectIndex={() => {
                      selectChoice(questionId, choice.choice, choice.point);
                    }}
                  />
                ))}
              </Grid>
              <Grid item md={6} xs={12}>
                {choices?.slice(2, 4).map((choice, index) => (
                  <Choice
                    key={index}
                    letter={String.fromCharCode(67 + index)}
                    choice={choice.choice}
                    isSelected={choice.isSelected!}
                    questionId={questionId}
                    selectIndex={() => {
                      selectChoice(questionId, choice.choice, choice.point);
                    }}
                  />
                ))}
              </Grid>
            </Grid>
          </OutlinedCard>
        </Box>
      </section>
    </>
  );
};

export default QuestionCard;
