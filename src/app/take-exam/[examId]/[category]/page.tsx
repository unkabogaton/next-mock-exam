"use client";

import Exam from "@/screens/Exam";
import QuestionsProvider from "@/context/questions";

const ExamPage = () => {
  return (
    <>
      <QuestionsProvider>
        <div>ExamPage</div>
        <Exam></Exam>
      </QuestionsProvider>
    </>
  );
};

export default ExamPage;
