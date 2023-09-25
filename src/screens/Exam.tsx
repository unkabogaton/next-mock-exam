import React from "react";
import QuestionCard from "../components/QuestionCard";
import { questions } from "../data";

const Exam = () => {
  return (
    <>
      {questions?.map((question) => (
        <QuestionCard key={question.itemNumber} {...question}></QuestionCard>
      ))}
    </>
  );
};

export default Exam;
