"use client";

import QuestionsProvider from "../../context/questions";
import Questions from "./Questions";

const Exam = () => {
  return (
    <QuestionsProvider>
      <Questions></Questions>
    </QuestionsProvider>
  );
};

export default Exam;
