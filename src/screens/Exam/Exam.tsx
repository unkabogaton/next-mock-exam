"use client";

import QuestionsProvider from "@/context/questions";
import Questions from "./Questions";
import { useQueryClient } from "react-query";

const Exam = () => {
  const queryClient = useQueryClient();
  // console.log{queryClient}
  return (
    <QuestionsProvider>
      <Questions></Questions>
    </QuestionsProvider>
  );
};

export default Exam;
