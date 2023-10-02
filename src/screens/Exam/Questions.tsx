import QuestionCard from "./QuestionCard";
import { useQuestions } from "@/context/questions/store";
import {
  useSearchParams,
  useParams,
  usePathname,
  useRouter,
} from "next/navigation";

import { QuestionsTypes } from "@/types/questions";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

const Questions = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const confirmationMessage =
        "Are you sure you want to leave? All your answers will disappear.";
      return confirmationMessage;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const { state, addQuestions } = useQuestions();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { category } = useParams();
  const page = Number(searchParams.get("page"));
  const pageId = Number(searchParams.get("page")) - 1;
  const examId = searchParams.get("id");
  const noPrev = pageId == 0;
  const noNext = pageId >= state.randomIndexes.length - 1;
  console.log(state.randomIndexes.length);
  const questionsExist = state.questions[pageId * 10];
  const pageNumber = "Math.floor(Math.floor(y/x)) + 1";
  const questions: QuestionsTypes[] = state.questions.slice(
    pageId * 10,
    pageId * 10 + 10
  );

  const newParams = new URLSearchParams();
  newParams.set("page", (page + 1).toString());

  const handleNext = () => {
    // addQuestions("wnwf", "kqnckeq", pageId)
    console.log("kadnvi");
    router.push(`${pathname}?page=${page + 1}`);
  };
  const handlePrev = () => {
    router.push(`${pathname}?page=${page - 1}`);
  };

  return (
    <>
      <h1>{state.category?.name}</h1>
      {questions?.map((question, index) => (
        <QuestionCard
          key={index}
          {...question}
          questionId={pageId * 10 + index}
        ></QuestionCard>
      ))}

      <Button
        variant="contained"
        size="medium"
        onClick={handlePrev}
        disabled={noPrev}
        sx={{ margin: "auto" }}
      >
        Back
      </Button>
      <Button
        variant="contained"
        size="medium"
        onClick={handleNext}
        disabled={noNext}
      >
        Next
      </Button>
    </>
  );
};

export default Questions;
