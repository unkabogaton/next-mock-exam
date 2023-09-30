import QuestionCard from "./QuestionCard";
import { useQuestions } from "@/context/questions/store";

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
  const questions: QuestionsProps[] = state.questions;

  return (
    <>
      {questions?.map((question, index) => (
        <QuestionCard
          key={index}
          {...question}
          questionId={index}
        ></QuestionCard>
      ))}
    </>
  );
};

export default Questions;
