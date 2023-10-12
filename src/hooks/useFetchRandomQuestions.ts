import db from "@/firebase";
import { collection, limit, query, where } from "firebase/firestore";
import iterateFetch from "./useIterateFetch";
import { QuestionsTypes } from "@/types/questions";

const fetchRandomQuestions = async (
  examId: string,
  category: string,
  randomIdArray: number[]
) => {
  const questionsCollections = collection(db, "exams", examId, "questions");
  const constraints = [
    where("category", "==", category),
    where("indexNumber", "in", randomIdArray),
    limit(10),
  ];
  const questionsQuery = query(questionsCollections, ...constraints);
  const { cleanedData }: { cleanedData: QuestionsTypes[] } = await iterateFetch(
    questionsQuery,
    ["question", "choices"]
  );

  const shuffleChoices = (questions: QuestionsTypes[]) => {
    return questions.map((question) => {
      const shuffledChoices = [...question.choices].sort(
        () => Math.random() - 0.5
      );
      return { ...question, choices: shuffledChoices };
    });
  };

  const questions = shuffleChoices(cleanedData);
  return questions;
};

export default fetchRandomQuestions;
