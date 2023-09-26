import QuestionCard from "../../components/QuestionCard";
import { useQuestions } from "../../context/questions/context";

interface QuestionsProps {
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
      {questions?.map((question, index: number) => (
        <QuestionCard
          key={index}
          {...question}
          questionIndex={index}
        ></QuestionCard>
      ))}
    </>
  );
};

export default Questions;
