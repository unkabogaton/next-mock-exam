import QuestionCard from "./QuestionCard";
import { useQuestions } from "@/context/questions/store";
import { useSearchParams, useParams, usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const { category } = useParams();
  const page = Number(searchParams.get("page"));
  const pageId = Number(searchParams.get("page")) - 1;
  const examId = searchParams.get("id");
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
      <h1>{state.category?.name}</h1>
      {questions?.map((question, index) => (
        <QuestionCard
          key={index}
          {...question}
          questionId={pageId * 10 + index}
        ></QuestionCard>
      ))}
      <Link href={`${pathname}?page=${page - 1}`}>
        <button disabled={noPrev}>Prev</button>
      </Link>
      <Link href={`${pathname}?page=${page + 1}`}>
        <button
          disabled={noNext}
          // onClick={() => addQuestions("wnwf", "kqnckeq", pageId)}
        >
          Next
        </button>
      </Link>
    </>
  );
};

export default Questions;
