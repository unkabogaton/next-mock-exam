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

const Exams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [questions, setQuestions] = useState<QuestionsTypes[]>([]);
  const {
    data: category,
    isError,
    error,
    isLoading,
  } = useFetchNestedDoc("categories", "EpynhphcBA4nAZRDEMnV");
  const randomIndexes = useGenerateIndexes(
    (category as CategoriesType)?.lastIndex,
    (category as CategoriesType)?.deletedIndex
  );
  console.log(category);
  const page = Number(searchParams.get("page"));
  const pageId = page - 1;
  const questionsExist = questions[(pageId + 1) * 10];
  const score: number[] = [];
  const { examId } = useParams();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }
  const filteredQuestions = questions.slice(pageId * 10, pageId * 10 + 10);
  const next = async () => {
    if (!questionsExist) {
      const newQuestions = await fetchRandomQuestions(
        examId as string,
        (category as CategoriesType).name,
        randomIndexes[page]
      );
      setQuestions([...questions, ...newQuestions]);
      score.push(1);
      console.log(score);
      router.push(`${pathname}?page=${page + 1}`);
    } else {
      router.push(`${pathname}?page=${page + 1}`);
    }
  };
  console.log(questions);
  return (
    <>
      {filteredQuestions?.map((question, index) => (
        <QuestionCard
          key={index}
          {...question}
          questionId={pageId * 10 + index}
        ></QuestionCard>
      ))}
      <button onClick={next}>Next</button>
    </>
  );
};

export default Exams;
