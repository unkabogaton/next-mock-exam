import QuestionCard from "../../components/QuestionCard";
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
      {questions?.map((question) => (
        <QuestionCard key={question.itemNumber} {...question}></QuestionCard>
      ))}
    </>
  );
};

export default Questions;
