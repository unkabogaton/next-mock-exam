"use client";
import React, { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { questions } from "../data";

const Exam = () => {
  const [questionsState, setQuestionState] = useState(questions);
  return (
    <>
      {questionsState?.map((question) => (
        <QuestionCard key={question.itemNumber} {...question}></QuestionCard>
      ))}
    </>
  );
};

export default Exam;
