import QuestionCard from "./QuestionCard";
import { useQuestions } from "@/context/questions/store";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
  const { state, addQuestions } = useQuestions();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page"));
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

  const newParams = new URLSearchParams();
  newParams.set("page", (page + 1).toString());
  console.log(newParams.toString());

  return (
    <>
      {questions?.map((question, index) => (
        <QuestionCard
          key={index}
          {...question}
          questionId={index}
        ></QuestionCard>
      ))}
      <Link href={`/exam?page=${page - 1}`}>
        <button disabled={noPrev}>Prev</button>
      </Link>
      <Link href={`/exam?page=${page + 1}`}>
        <button
          disabled={noNext}
          onClick={() => addQuestions("wnwf", "kqnckeq", pageId)}
        >
          Next
        </button>
      </Link>
    </>
  );
};

export default Questions;
