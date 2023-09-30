import db from "@/firebase";
import { collection, limit, query, where } from "firebase/firestore";
import iterateFetch from "@/apis/iterateFetch";

interface QuestionsProps {
  id: string;
  question: string;
  created?: object;
  approval?: object;
  indexNumber: number;
  category: string;
  choices: choicesProps[];
}

interface choicesProps {
  choice: string;
  isSelected?: boolean;
  point: number;
}

const fetchRandomQuestions = async (
  examId: string,
  category: string,
  randomIdArray: number[]
) => {
  const questionsCollections = collection(db, "exams", examId, "questions");
  const constraints = [
    where("category", "==", category),
    where("approved", "==", true),
    where("indexNumber", "in", randomIdArray),
    limit(10),
  ];
  const questionsQuery = query(questionsCollections, ...constraints);
  const attributes = ["id", "question", "choices"];
  const { cleanedData }: { cleanedData: QuestionsProps[] } = await iterateFetch(
    questionsQuery,
    attributes
  );
  return cleanedData;
};

export default fetchRandomQuestions;
