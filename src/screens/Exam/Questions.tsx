import { useState } from "react";
import QuestionCard from "./QuestionCard";
import { useQuestions } from "@/context/questions/store";
import { useSearchParams } from "next/navigation";

interface QuestionsProps {
  itemNumber: number;
  question?: string;
  choices?: choicesProps[];
}

interface choicesProps {
  choice: string;
  isSelected: boolean;
  point: number;
}

const Questions = () => {
  const { state } = useQuestions();
  const searchParams = useSearchParams();
  const pageId = Number(searchParams.get("page")) - 1;
  const examId = searchParams.get("id");
  const category = searchParams.get("category");
  const noPrev = pageId == 0;
  const noNext = pageId == state.randomIndexes.length - 1;
  const questionsExist = state.questions[pageId * 10];
  const pageNumber = "Math.floor(Math.floor(y/x)) + 1";
  const questions: QuestionsProps[] = state.questions.slice(
    pageId * 10,
    pageId * 10 + 10
  );

  return (
    <>
      {questions?.map((question, index) => (
        <QuestionCard
          key={index}
          {...question}
          questionId={index}
        ></QuestionCard>
      ))}
      <button disabled={noPrev}>Prev</button>
      <button disabled={noNext}>Next</button>
    </>
  );
};

export default Questions;
