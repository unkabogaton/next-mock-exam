import useFetchNestedDoc from "@/hooks/useFetchNestedDoc";
import useGenerateIndexes from "@/hooks/useGenerateIndexes";
import { CategoriesType } from "@/types/categories";
import { useState } from "react";
import {
  useSearchParams,
  useParams,
  usePathname,
  useRouter,
} from "next/navigation";
import fetchRandomQuestions from "@/hooks/useFetchRandomQuestions";
import { QuestionsTypes } from "@/types/questions";
import QuestionCard from "./QuestionCard";
import { Button } from "@mui/material";
import Link from "next/link";

const Exams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { examId, categoryParams } = useParams();
  const [questions, setQuestions] = useState<QuestionsTypes[]>([]);
  const [score, setScore] = useState<(number | null)[]>([]);
  const {
    data: category,
    isError,
    error,
    isLoading,
  } = useFetchNestedDoc("categories", categoryParams[0]);
  const randomIndexes = useGenerateIndexes(
    (category as CategoriesType)?.lastIndex,
    (category as CategoriesType)?.deletedIndex
  );
  const page = Number(searchParams.get("page"));
  const pageId = page - 1;
  const questionsExist = questions[(pageId + 1) * 10];
  const noPrev = pageId <= 0;
  const noNext = pageId >= randomIndexes.length - 1;

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  const filteredQuestions = questions.slice(pageId * 10, pageId * 10 + 10);
  const handleNext = async () => {
    if (!questionsExist) {
      const newQuestions = await fetchRandomQuestions(
        examId as string,
        (category as CategoriesType).name,
        randomIndexes[page]
      );
      setQuestions([...questions, ...newQuestions]);
      router.push(`${pathname}?page=${page + 1}`);
    } else {
      router.push(`${pathname}?page=${page + 1}`);
    }
  };
  const handlePrev = () => {
    router.push(`${pathname}?page=${page - 1}`);
  };
  const selectChoice = (
    questionId: number,
    choiceItem: string,
    point: number
  ) => {
    const questionsCopy = [...questions];
    questionsCopy[questionId]?.choices.forEach((choice) => {
      choice.isSelected = choice.choice === choiceItem;
    });
    setQuestions(questionsCopy);
    score[questionId] = point;
  };
  console.log(questions);

  return (
    <>
      <Link href="#9">Go to Section 1</Link>
      {filteredQuestions?.map((question, index) => (
        <QuestionCard
          key={index}
          {...question}
          questionId={pageId * 10 + index}
          selectChoice={selectChoice}
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
        {page == 0 ? "Begin" : "Next"}
      </Button>

      {noNext && (
        <Button variant="contained" size="medium">
          Submit
        </Button>
      )}
    </>
  );
};

export default Exams;
