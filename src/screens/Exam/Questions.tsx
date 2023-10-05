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

const Questions = () => {
  const { state, addQuestions } = useQuestions();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { category, examId } = useParams();
  const page = Number(searchParams.get("page"));
  const pageId = Number(searchParams.get("page")) - 1;
  const noPrev = pageId == 0;
  const noNext = pageId >= state.randomIndexes.length - 1;
  const questionsExist = state.questions[(pageId + 1) * 10];
  console.log(questionsExist);
  const pageNumber = "Math.floor(Math.floor(y/x)) + 1";
  const questions: QuestionsTypes[] = state.questions.slice(
    pageId * 10,
    pageId * 10 + 10
  );
  const newParams = new URLSearchParams();
  newParams.set("page", (page + 1).toString());

  const handleBegin = async () => {
    await addQuestions(examId, category, pageId);
  };
  const handleNext = async () => {
    if (!questionsExist) {
      await addQuestions(examId, category, pageId + 1);
      router.push(`${pathname}?page=${page + 1}`);
    } else {
      router.push(`${pathname}?page=${page + 1}`);
    }
    console.log(state.questions);
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
      <Button variant="contained" size="medium" onClick={handleBegin}>
        Begin
      </Button>

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
      {noNext && (
        <Button variant="contained" size="medium">
          Submit
        </Button>
      )}
    </>
  );
};

export default Questions;
